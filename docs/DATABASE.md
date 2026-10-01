# DATABASE.md

## 1. Purpose
This file describes the data storage architecture, client-side state models, and static data structures for the **Frank Patel Portfolio**.

## 2. Architecture Overview
This portfolio is a **static web application** hosted on GitHub Pages.
- There is **no direct server-side database connection** (e.g., PostgreSQL or MongoDB) exposed directly to the frontend.
- Incoming lead inquiries are handled through the serverless **Formspree** platform.
- Client-side persistence is managed via browser **`localStorage`** and URL hash routing.

## 3. Client-Side Persistent Models (`localStorage`)

### 1. Contact Form Rate Limiting
- **Key:** `fp_last_contact_submit`
- **Type:** String (Unix timestamp in milliseconds, e.g. `"1759310000000"`)
- **Purpose:** Enforces a 60-second client-side cooldown between contact form submissions to prevent accidental double-submits and spam flooding.
- **Expiration:** Checked against `Date.now()` on form submission. Overwritten on successful submission.

### 2. Cookie & Compliance Consent (if active)
- **Key:** `fp_cookie_consent`
- **Type:** String (`"accepted"` | `"declined"`)
- **Purpose:** Stores the visitor's cookie/analytics preferences.

## 4. Static Data Structures in Code
The portfolio's content is modeled cleanly across semantic HTML components and structured data schemas:

### Schema.org JSON-LD (Search Engines)
Located in `<head>` of `index.html`:
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "name": "Frank Patel",
      "jobTitle": "Full-Stack Developer & Python Automation Engineer",
      "url": "https://frankpatel1.github.io/My-Portfolio/",
      "sameAs": [
        "https://github.com/frankpatel1",
        "https://linkedin.com/in/frankpatel16"
      ]
    },
    {
      "@type": "WebSite",
      "name": "Frank Patel Portfolio",
      "url": "https://frankpatel1.github.io/My-Portfolio/"
    }
  ]
}
```

### Static Component Entities
- **Services (8 items):** Identified by `01` through `08`. Each item encapsulates Title, Description, Technology Pills, Highlight Badge, and CTA link.
- **Projects (4 featured):** Showcase cards with category tags, descriptions, live demo links, and screenshot assets in `/assets/images/thumbs/`.
- **GitHub Projects (Open Source):** Filterable items with `data-category="javascript html-css"`, repo stats, and direct repository links.
- **Milestones (6 items):** Year-tagged achievement items with quantifiable metric titles and focus areas.

## 5. Production Safety & Migration Rules
1. **Never store sensitive data:** Do not save tokens, passwords, or personal user data in `localStorage`.
2. **Schema Integrity:** When adding new project or service cards, maintain the exact HTML element hierarchy and ARIA labels.
3. **Asset References:** Ensure all image and PDF paths (`assets/Frank-Patel-Resume.pdf`, `assets/images/...`) are relative and verified before deployment.
