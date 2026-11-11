import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

// Receives one passport photo from the Stay page (multipart: code, guest_name, file).
// Auth is the invitation code itself: it must belong to an on-site (villa) guest.
// Deployed with verify_jwt = false; writes with the service role into the private
// 'passports' bucket, so the browser never gets read access to any file.

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

const TYPES: Record<string, string> = {
  "image/jpeg": "jpg", "image/png": "png", "image/heic": "heic", "image/heif": "heif", "application/pdf": "pdf",
};
const BY_EXT: Record<string, string> = {
  jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", heic: "image/heic", heif: "image/heif", pdf: "application/pdf",
};
const MAX_BYTES = 10 * 1024 * 1024;
const MAX_PER_CODE = 12;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let form: FormData;
  try { form = await req.formData(); } catch { return json({ error: "Invalid upload." }, 400); }

  const code = String(form.get("code") ?? "").trim().toUpperCase();
  const guestName = String(form.get("guest_name") ?? "").trim().slice(0, 120);
  const file = form.get("file");
  if (!code || !guestName || !(file instanceof File)) return json({ error: "Please add a name and a photo." }, 400);
  if (file.size === 0 || file.size > MAX_BYTES) return json({ error: "The file must be under 10 MB." }, 400);

  // Some browsers send no type for HEIC; fall back to the extension.
  const extFromName = (file.name.split(".").pop() ?? "").toLowerCase();
  const mime = TYPES[file.type] ? file.type : BY_EXT[extFromName];
  if (!mime) return json({ error: "Please upload a JPEG, PNG, HEIC or PDF." }, 400);

  const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  const { data: guest } = await sb.from("guest_accommodations")
    .select("code, accommodation_type").eq("code", code).maybeSingle();
  if (!guest || guest.accommodation_type !== "villa") return json({ error: "Code not recognised." }, 403);

  const { count } = await sb.from("passport_uploads").select("id", { count: "exact", head: true }).eq("code", code);
  if ((count ?? 0) >= MAX_PER_CODE) return json({ error: "Too many uploads for this code. Please email us." }, 429);

  const path = `${code}/${crypto.randomUUID()}.${TYPES[mime]}`;
  const up = await sb.storage.from("passports").upload(path, file, { contentType: mime, upsert: false });
  if (up.error) return json({ error: "Upload failed, please try again." }, 500);

  const ins = await sb.from("passport_uploads").insert({ code, guest_name: guestName, file_path: path });
  if (ins.error) {
    await sb.storage.from("passports").remove([path]);
    return json({ error: "Upload failed, please try again." }, 500);
  }
  return json({ ok: true });
});
