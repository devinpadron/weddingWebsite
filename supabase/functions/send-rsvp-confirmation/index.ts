import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// Sends a confirmation email when a new RSVP row is inserted.
// Invoked by the `rsvp_confirmation_after_insert` Postgres trigger (pg_net),
// which POSTs the new row plus a shared secret. Auth is the x-webhook-secret
// header, so this function is deployed with verify_jwt = false.
//
// Required env (set in the Supabase dashboard → Edge Functions → Secrets):
//   RESEND_API_KEY   Resend API key
//   WEBHOOK_SECRET   must match the secret in the DB trigger
// Optional env:
//   RSVP_FROM        e.g. "Samantha & Devin <rsvp@samanthaanddevin.com>"
//   RSVP_REPLY_TO    e.g. "samanthaanddevin2027@gmail.com"

const WEBHOOK_SECRET = Deno.env.get("WEBHOOK_SECRET") ?? "";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const FROM = Deno.env.get("RSVP_FROM") ?? "Samantha & Devin <rsvp@samanthaanddevin.com>";
const REPLY_TO = Deno.env.get("RSVP_REPLY_TO") ?? "samanthaanddevin2027@gmail.com";

const esc = (s: string) =>
  String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );

function buildEmail(r: Record<string, unknown>) {
  const name = esc(String(r.name ?? ""));
  const attending = String(r.attending ?? "") === "yes";
  const party = Number(r.party_size ?? 1);
  const diet = Array.isArray(r.diet) ? (r.diet as string[]) : [];

  const subject = attending
    ? "We can’t wait to see you — RSVP confirmed"
    : "Your RSVP — we’ll miss you";

  const lede = attending
    ? "Your reply is in, and we could not be more thrilled. Here is what we have down for you:"
    : "Thank you for letting us know. We will miss you dearly, but we are grateful you replied. Here is what we have down:";

  const rows: string[] = [
    `<tr><td style="padding:6px 0;color:#7A6E5A;font-size:11px;letter-spacing:.18em;text-transform:uppercase;">Guest</td><td style="padding:6px 0;text-align:right;">${name}</td></tr>`,
    `<tr><td style="padding:6px 0;color:#7A6E5A;font-size:11px;letter-spacing:.18em;text-transform:uppercase;">Party</td><td style="padding:6px 0;text-align:right;">${party}</td></tr>`,
    `<tr><td style="padding:6px 0;color:#7A6E5A;font-size:11px;letter-spacing:.18em;text-transform:uppercase;">Attending</td><td style="padding:6px 0;text-align:right;">${attending ? "Joyfully, yes" : "Regretfully, no"}</td></tr>`,
  ];
  if (attending && diet.length) {
    rows.push(`<tr><td style="padding:6px 0;color:#7A6E5A;font-size:11px;letter-spacing:.18em;text-transform:uppercase;">Dietary</td><td style="padding:6px 0;text-align:right;">${esc(diet.join(", "))}</td></tr>`);
  }

  const closing = attending
    ? "We will follow up with travel and accommodation details closer to the day. Pack linen."
    : "We will raise a glass for you on June 2.";

  const html = `<!doctype html><html><body style="margin:0;background:#F5F0E8;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5F0E8;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#FFFFFF;border:1px solid rgba(124,110,90,.28);">
        <tr><td style="padding:44px 44px 8px;text-align:center;">
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:30px;color:#2C2A25;letter-spacing:.04em;">S &amp; D</div>
          <div style="margin-top:10px;color:#7A6E5A;font-size:10px;letter-spacing:.32em;text-transform:uppercase;font-family:Arial,sans-serif;">1 &mdash; 4 June 2027 &middot; Umbria, Italy</div>
        </td></tr>
        <tr><td style="padding:20px 44px;">
          <p style="font-family:Georgia,serif;font-style:italic;font-size:26px;color:#2C2A25;line-height:1.3;margin:0 0 18px;text-align:center;">${attending ? "We can’t wait to see you." : "We’ll miss you dearly."}</p>
          <p style="font-family:Arial,sans-serif;font-size:15px;color:#3a382f;line-height:1.7;margin:0 0 24px;">Dear ${name},</p>
          <p style="font-family:Arial,sans-serif;font-size:15px;color:#3a382f;line-height:1.7;margin:0 0 24px;">${lede}</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;font-size:14px;color:#2C2A25;border-top:1px solid rgba(124,110,90,.2);border-bottom:1px solid rgba(124,110,90,.2);margin:0 0 24px;">${rows.join("")}</table>
          <p style="font-family:Arial,sans-serif;font-size:15px;color:#3a382f;line-height:1.7;margin:0 0 8px;">${closing}</p>
          <p style="font-family:Arial,sans-serif;font-size:15px;color:#3a382f;line-height:1.7;margin:24px 0 0;">With love,<br>Samantha &amp; Devin</p>
        </td></tr>
        <tr><td style="padding:16px 44px 40px;text-align:center;">
          <div style="color:#9a907c;font-size:11px;font-family:Arial,sans-serif;line-height:1.6;">Need to change your reply? Just reply to this email.</div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const text = `${attending ? "We can't wait to see you." : "We'll miss you dearly."}\n\nDear ${name},\n\n${lede}\n\nGuest: ${name}\nParty: ${party}\nAttending: ${attending ? "Joyfully, yes" : "Regretfully, no"}${attending && diet.length ? `\nDietary: ${diet.join(", ")}` : ""}\n\n${closing}\n\nWith love,\nSamantha & Devin`;

  return { subject, html, text };
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // Shared-secret auth from the DB trigger
  const provided = req.headers.get("x-webhook-secret") ?? "";
  if (!WEBHOOK_SECRET || provided !== WEBHOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }

  // Accept either the raw row or a { record } envelope
  const record = (body.record ?? body) as Record<string, unknown>;
  const to = String(record.email ?? "").trim();

  if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    // No usable email — nothing to send, but not an error worth retrying
    return new Response(JSON.stringify({ skipped: "no valid email" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY not set — cannot send confirmation");
    return new Response(JSON.stringify({ error: "email provider not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { subject, html, text } = buildEmail(record);

  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM, to, reply_to: REPLY_TO, subject, html, text }),
  });

  if (!resp.ok) {
    const detail = await resp.text();
    console.error("Resend error", resp.status, detail);
    return new Response(JSON.stringify({ error: "send failed", status: resp.status, detail }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  const out = await resp.json();
  console.log("Confirmation sent", out?.id ?? "", "to", to);
  return new Response(JSON.stringify({ ok: true, id: out?.id ?? null }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
