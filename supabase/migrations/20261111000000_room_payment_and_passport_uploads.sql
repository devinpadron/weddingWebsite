-- Room payment fields (additive; existing rows and functions keep working)
alter table public.guest_accommodations
  add column if not exists room_price  text,        -- shown to the guest as typed, e.g. "€1,200"
  add column if not exists payment_url text,        -- Stripe Payment Link
  add column if not exists paid_at     timestamptz;

-- Passport uploads: one row per person; the file lives in the private 'passports' bucket
create table if not exists public.passport_uploads (
  id          uuid primary key default gen_random_uuid(),
  code        text not null references public.guest_accommodations(code) on update cascade on delete restrict,
  guest_name  text not null,
  file_path   text not null,
  uploaded_at timestamptz not null default now()
);
create index if not exists passport_uploads_code_idx on public.passport_uploads(code);
alter table public.passport_uploads enable row level security;  -- no policies: service role only
revoke all on public.passport_uploads from anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('passports', 'passports', false, 10485760,
        array['image/jpeg','image/png','image/heic','image/heif','application/pdf'])
on conflict (id) do nothing;

-- Guest lookup now also returns price, payment link, paid flag, and whose passports are in.
-- (Return type changes, so the function has to be dropped and recreated. Older pages ignore the extra columns.)
drop function if exists public.lookup_accommodation(text);
create function public.lookup_accommodation(guest_code text)
 returns table(code text, guest_name text, accommodation_type text, property_name text, room_detail text,
               check_in date, check_out date, notes text, booking_url text, sharing_with text,
               room_price text, payment_url text, paid boolean, passports text[])
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  r public.guest_accommodations%rowtype;
  hit boolean;
begin
  select * into r from public.guest_accommodations g where upper(g.code) = upper(btrim(coalesce(guest_code, '')));
  hit := found;
  insert into public.accommodation_lookups(code, found) values (left(btrim(coalesce(guest_code, '')), 64), hit);
  if not hit then return; end if;
  return query
    select r.code, r.guest_name, r.accommodation_type, r.property_name,
           r.room_detail, r.check_in, r.check_out, r.notes, r.booking_url,
           (select string_agg(o.guest_name, ', ' order by o.guest_name)
              from public.guest_accommodations o
             where r.accommodation_type = 'villa'
               and o.accommodation_type = 'villa'
               and o.code <> r.code
               and o.room_detail is not null
               and lower(btrim(o.room_detail)) = lower(btrim(r.room_detail))),
           r.room_price, r.payment_url, (r.paid_at is not null),
           coalesce((select array_agg(u.guest_name order by u.uploaded_at)
                       from public.passport_uploads u where u.code = r.code), '{}'::text[]);
end $function$;
grant execute on function public.lookup_accommodation(text) to anon, authenticated, service_role;

-- Admin: set price / payment link / paid for one code
create or replace function public.admin_set_payment(pw text, p_code text, p_price text, p_payment_url text, p_paid boolean)
 returns void
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
begin
  perform public.admin_check(pw);
  update public.guest_accommodations set
    room_price  = nullif(btrim(coalesce(p_price, '')), ''),
    payment_url = nullif(btrim(coalesce(p_payment_url, '')), ''),
    paid_at     = case when coalesce(p_paid, false) then coalesce(paid_at, now()) else null end
  where code = upper(btrim(p_code));
end $function$;
grant execute on function public.admin_set_payment(text, text, text, text, boolean) to anon, authenticated, service_role;

-- Admin: list passport uploads (the files are fetched through the passport-admin edge function)
create or replace function public.admin_passports(pw text)
 returns setof public.passport_uploads
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
begin
  perform public.admin_check(pw);
  return query select * from public.passport_uploads order by code, uploaded_at;
end $function$;
grant execute on function public.admin_passports(text) to anon, authenticated, service_role;
