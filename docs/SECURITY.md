# SECURITY.md

## 1. Purpose
This file defines the security rules for this project. All developers and AI coding agents must follow these rules.

## 2. Authentication & Authorization
- Use [Clerk / Supabase Auth / NextAuth] for authentication.
- Protected routes must verify the user's session on the server.
- Never trust a user ID or role sent only from the client.
- Check permissions before reading or modifying protected data.
- Use role-based access where the product requires different permissions.

## 3. Secrets & Environment Variables
- Store API keys and credentials in environment variables.
- Never hardcode secrets in source code.
- Never commit .env files.
- Keep a .env.example containing variable names only.
- Use separate credentials for development and production.

Example:
DATABASE_URL=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_APP_URL=

## 4. Input Validation
- Validate all user-controlled input.
- Validate again on the server even if the UI already validates it.
- Use a schema validator such as Zod when appropriate.
- Reject unexpected fields and invalid data types.

## 5. API Security
- Require authentication on protected endpoints.
- Apply authorization checks before sensitive actions.
- Add rate limiting to endpoints vulnerable to abuse.
- Use HTTPS in production.
- Do not expose internal stack traces to users.

## 6. Data Protection
- Store only data the product actually needs.
- Do not log passwords, tokens or sensitive personal data.
- Use parameterized queries or the project's ORM.
- Restrict database permissions where possible.
- Use provider-supported encryption and backups.

## 7. Error Handling
User-facing errors should be useful but must not reveal:
- database credentials
- API keys
- stack traces
- internal file paths
- sensitive account information

## 8. AI Agent Rules
The coding agent must:
- Never invent or hardcode production credentials.
- Never disable authentication to make a feature work.
- Never bypass authorization checks.
- Never expose secrets in client-side code.
- Ask for clarification when a requested change conflicts with this file.
