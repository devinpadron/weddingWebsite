# Pre-Launch Audit — samanthaanddevin.com

> Reviewed: 30 June 2026

---

## Dead Links (href="#")

These three links visually work but go nowhere. Each needs a real destination before launch.

| Section | Link text | File | Line |
|---|---|---|---|
| Travel & Stay → Accommodations | "Booking details →" | `sections2.jsx` | 200 |
| Travel & Stay → Getting There | "Full travel guide →" | `sections2.jsx` | 229 |

---

## RSVP Form — Not Wired Up

The RSVP modal looks complete but submissions go nowhere. The `submit()` function (`sections2.jsx:314`) just calls `setSubmitted(true)` — no data is posted to any backend or form service. Every reply is silently lost.
**Fixed**

**Needs:** a form endpoint (Formspree, Netlify Forms, Supabase, etc.) that captures name, party size, attendance, dietary needs, song request, and message.

---

## Content Gaps

### Accommodation booking system not built
`sections2.jsx:185` — Copy says guests book "using the code you'll receive with your invitation." That code system and the actual booking page (or direct SPAO link) don't exist yet. The "Booking details →" link (line 200) should point to it once ready.

### Shuttle logistics unconfirmed
`sections2.jsx:222` — "Complimentary from NAP, 1 & 2 June" is listed as a concrete fact. Needs to be confirmed and arranged with a transport company before the site goes live, or softened to "TBC" until confirmed.

### Contact email needs to be set up
`sections2.jsx:742` — Footer lists `hello@samanthaanddevin.com`. This address needs to exist and be monitored before any guests land on the page.
**Fixed**

---

## Inconsistencies

### Location: Umbria vs. Campania
The save-the-date page (`savethedate/index.html:8`) has OG meta description saying **"Umbria, Italy"** while the entire homepage says **"Campania, Italy"**. One of them is wrong — fix whichever is incorrect.
**Fixed**

### Hero GPS coordinates
`sections.jsx:300` — The decorative coordinates in the hero read `N 40° 45′ · E 14° 36′`. These are approximately the Naples city centre, not the SPAO venue. Verify and update to the actual venue coordinates if accuracy matters.
**Fixed**

---

## Minor / Polish

- **`savethedate/` page still exists and is reachable** at `/savethedate/` — guests who bookmarked the old URL will still land there (gated behind a password). Consider whether to keep it, redirect it, or leave it as-is.
- **`Home.html` is now a redundant file** — `index.html` was replaced with its content. `Home.html` can be deleted to avoid confusion.
**Fixed**
- **No 404 page** — any broken URL (e.g. `/rsvp`, `/travel`) returns a GitHub Pages default. A custom 404 pointing back to the homepage would be cleaner.
