# API.md

## 1. Purpose
This file documents the API conventions and important endpoints used by this project.

## 2. Base Configuration
Development: http://localhost:3000/api
Production: https://your-domain.com/api
Response format: JSON

If the API is versioned:
Base path: /api/v1

## 3. Authentication
Protected endpoints require an authenticated session/token.

Example header:
Authorization: Bearer <token>

Never expose server-only API credentials to the browser.

## 4. Endpoint Conventions
Use nouns for resources where practical.

GET    /api/v1/projects
GET    /api/v1/projects/:id
POST   /api/v1/projects
PATCH  /api/v1/projects/:id
DELETE /api/v1/projects/:id

## 5. Example Endpoint

### POST /api/v1/projects
Creates a new project.

Authentication: Required

Request:
```json
{
  "name": "Creator Dashboard"
}
```

Success — 201:
```json
{
  "success": true,
  "data": {
    "id": "project_123",
    "name": "Creator Dashboard"
  }
}
```

Validation error — 400:
```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Project name is required."
  }
}
```

## 6. Status Codes
200 - Successful request
201 - Resource created
400 - Invalid request
401 - Authentication required
403 - Authenticated but not allowed
404 - Resource not found
409 - Conflict
429 - Too many requests
500 - Unexpected server error

## 7. Error Rules
- Return a consistent error shape.
- Do not return internal stack traces.
- Give users actionable messages where safe.
- Log enough server-side context to debug failures.
- Do not log secrets or sensitive request data.

## 8. Rate Limiting
Apply rate limits to endpoints that can be abused, especially:
- authentication
- password reset
- AI generation
- public forms
- expensive searches

## 9. Third-Party APIs
For every important integration, document:
- provider name
- purpose
- required environment variables
- server/client usage
- webhook endpoints
- expected failure behavior

Example:
Stripe
Purpose: payments
Secret: STRIPE_SECRET_KEY (server only)
Webhook: /api/webhooks/stripe
