# SECURITY.md

## 1. Purpose
This file defines the security policies, access rules, and data handling requirements for the **Frank Patel Portfolio** website.
All contributors and AI coding agents must strictly adhere to these practices.

## 2. Architecture & Attack Surface
- **Deployment Platform:** GitHub Pages (Static hosting via HTTPS).
- **Frontend Architecture:** Static HTML5, Vanilla JavaScript (ES6+), Vanilla CSS.
- **Backend / Form Processing:** Third-party serverless form submission via Formspree API (`https://formspree.io/f/xvkgrzpg`).
- **Data Storage:** Client-side `localStorage` only (no server-side database directly exposed).

## 3. Form & Contact Security
- **Endpoint Protection:** The Formspree endpoint is public by design, but client-side submissions must be hardened:
  - **Honeypot Trap:** `<input type="text" name="_gotcha" tabindex="-1" autocomplete="off" style="position:absolute;opacity:0;pointer-events:none;left:-9999px;">` to detect and deflect automated bot spam.
  - **Rate Limiting:** A 60-second client-side cooldown is enforced via `localStorage.getItem("fp_last_contact_submit")`.
  - **Input Validation:** Required field verification (Name >= 2 chars, valid email regex `^[^\s@]+@[^\s@]+\.[^\s@]+$`, Message >= 10 chars) before transmission.
- **Fail-Safe Fallback:** If Formspree fails or hits quota limits, provide a clean `mailto:frankpatel33@gmail.com` link. Never reveal server-side stack traces or Formspree account IDs.

## 4. External Links & Tabnabbing Prevention
- Every external link opening in a new tab (`target="_blank"`) **MUST** include `rel="noopener noreferrer"`.
- Applies to all social links (GitHub, LinkedIn, Instagram), resume downloads, and external documentation links.

## 5. Content Security & XSS Prevention
- Never use `eval()` or unvetted `innerHTML` string interpolation with unescaped user input.
- User input rendered into DOM elements (such as contact status boxes) must use `textContent` or sanitized markup.
- All third-party CDNs and scripts (Phosphor Icons, AOS, PureCounter, Swiper) must be hosted locally under `/assets/js/` and `/assets/css/` to prevent CDN compromise.

## 6. Secrets & Environment Variables
- This is a static GitHub Pages repository; **NEVER** commit private API tokens, private keys, or passwords.
- No `.env` files with secret values should ever be committed to git.
- If a future backend service is integrated, credentials must remain on a secure server, never exposed to client bundles.

## 7. AI Agent Security Rules
When modifying this codebase, the AI coding agent must:
1. **Never inject external inline scripts** from untrusted CDNs without user consent.
2. **Never remove `rel="noopener noreferrer"`** from outbound external links.
3. **Never bypass input validation** on the contact form.
4. **Never log sensitive user form data** to browser console in production.
5. **Always test HTTPS compliance** and avoid mixed content warnings.
