import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

// Admin-only access to passport files. Body: { pw, action: "sign" | "delete", id }.
//   sign   → a link to the file that expires after two minutes
//   delete → removes the file and its row
// The admin password is checked with the same admin_check() the Admin page uses.
// Deployed with verify_jwt = false.

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let body: { pw?: string; action?: string; id?: string };
  try { body = await req.json(); } catch { return json({ error: "Bad request" }, 400); }

  const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  const auth = await sb.rpc("admin_check", { pw: body.pw ?? "" });
  if (auth.error) return json({ error: "unauthorized" }, 401);

  const { data: row } = await sb.from("passport_uploads").select("id, file_path").eq("id", body.id ?? "").maybeSingle();
  if (!row) return json({ error: "Not found" }, 404);

  if (body.action === "sign") {
    const { data, error } = await sb.storage.from("passports").createSignedUrl(row.file_path, 120);
    if (error || !data) return json({ error: "Could not open the file." }, 500);
    return json({ url: data.signedUrl });
  }
  if (body.action === "delete") {
    const rm = await sb.storage.from("passports").remove([row.file_path]);
    if (rm.error) return json({ error: "Could not delete the file." }, 500);
    await sb.from("passport_uploads").delete().eq("id", row.id);
    return json({ ok: true });
  }
  return json({ error: "Unknown action" }, 400);
});
