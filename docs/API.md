# API.md

## 1. Purpose
This file documents the API endpoints, transmission protocols, external integrations, and request/response specifications for the **Frank Patel Portfolio**.

## 2. Primary Endpoint: Formspree Contact API

### `POST https://formspree.io/f/xvkgrzpg`
Handles contact form submissions from the portfolio's contact section.

- **URL:** `https://formspree.io/f/xvkgrzpg`
- **Method:** `POST`
- **Headers:**
  ```http
  Accept: application/json
  ```
- **Content-Type:** `multipart/form-data` or `application/x-www-form-urlencoded` (handled via `FormData(form)`).

### Request Payload Fields
| Field Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `name` | string | Yes | Sender's full name (min 2 characters). |
| `email` | string | Yes | Valid email address for follow-up reply. |
| `message` | string | Yes | Message body (min 10 characters). |
| `_subject` | string | No | Default: `"New Portfolio Inquiry"`. |
| `_gotcha` | string | No | Anti-spam honeypot field. Must be empty for human submissions. |

### Response Shapes

#### 1. Success (`200 OK`)
```json
{
  "ok": true
}
```
**Frontend Behavior:**
- Form resets via `form.reset()`.
- Submit button shows confirmation: `"Message Sent Successfully!"` with `#22c55e` (green) background.
- Status box displays: *"Thank you! Your message has been sent successfully. Frank will respond within 24 hours."*
- Timestamp saved in `localStorage.setItem("fp_last_contact_submit", Date.now().toString())`.

#### 2. Validation / Field Error (`400 Bad Request` or `422 Unprocessable Entity`)
```json
{
  "errors": [
    {
      "field": "email",
      "message": "is not valid",
      "code": "TYPE_EMAIL"
    }
  ]
}
```
**Frontend Behavior:**
- Parse `data.errors` array and display specific error message in `#contact-status`.
- Re-enable submit button.

#### 3. Rate Limit / Server Error (`429 Too Many Requests` / `500 Internal Error`)
```json
{
  "error": "Too many requests. Please try again later."
}
```
**Frontend Behavior:**
- Display error notice with direct fallback link: `<a href="mailto:frankpatel33@gmail.com">frankpatel33@gmail.com</a>`.

---

## 3. Communication Protocols & Native Handlers

### 1. Direct Email (Mailto Protocol)
- **URI:** `mailto:frankpatel33@gmail.com`
- **Usage:** Secondary contact cards, footer links, and API failure fallback.

### 2. Direct Phone / WhatsApp (Tel Protocol)
- **URI:** `tel:+919510780978`
- **Usage:** Direct mobile dialing and WhatsApp routing.

### 3. Google Maps Location Link
- **URI:** `https://www.google.com/maps/place/Ahmedabad,+Gujarat`
- **Attributes:** `target="_blank" rel="noopener noreferrer"`

---

## 4. Third-Party Integrations

### 1. Formspree
- **Purpose:** Serverless email forwarding for portfolio leads.
- **Quota & Constraints:** Managed in the Formspree account dashboard.
- **Fail-safe:** Graceful degradation to direct `mailto` link.

### 2. GitHub Public API (Optional / Future Read-Only)
- **Base URL:** `https://api.github.com/users/frankpatel1/repos`
- **Authentication:** Unauthenticated public rate limit (60 requests/hr/IP).
- **Caching:** Cache responses in `sessionStorage` if dynamic stargazers/forks are loaded.
