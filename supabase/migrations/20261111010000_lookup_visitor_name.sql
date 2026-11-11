-- Record the name the visitor typed at the site gate alongside each code lookup
alter table public.accommodation_lookups add column if not exists visitor_name text;

-- Adds an optional second argument; callers that send only guest_code keep working.
drop function if exists public.lookup_accommodation(text);
create function public.lookup_accommodation(guest_code text, visitor_name text default null)
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
  insert into public.accommodation_lookups(code, found, visitor_name)
  values (left(btrim(coalesce(guest_code, '')), 64), hit,
          nullif(left(btrim(coalesce(lookup_accommodation.visitor_name, '')), 80), ''));
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
grant execute on function public.lookup_accommodation(text, text) to anon, authenticated, service_role;
