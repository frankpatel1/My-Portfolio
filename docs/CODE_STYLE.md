# CODE_STYLE.md

## 1. Purpose
This file defines the coding conventions for this project. New code should follow existing patterns unless this file says otherwise.

## 2. Stack
- TypeScript
- React
- Next.js
- Tailwind CSS
- ESLint
- Prettier

## 3. General Principles
- Prefer readable code over clever code.
- Keep functions and components focused.
- Reuse existing components before creating new ones.
- Avoid unnecessary abstractions.
- Do not duplicate logic that already has a shared utility.

## 4. Naming
Components: PascalCase
Example: UserCard.tsx

Functions and variables: camelCase
Example: getUserData, currentUser

Constants: UPPER_SNAKE_CASE
Example: MAX_RETRY_COUNT

Boolean values should read clearly:
isLoading
hasAccess
canEdit

## 5. Components
- Use functional React components.
- Keep UI, business logic and data fetching separated when practical.
- Move reusable complex logic into custom hooks or utilities.
- Define clear TypeScript types for props.
- Handle loading, error and empty states.

## 6. Formatting
- Use the project's Prettier configuration.
- Use the project's ESLint configuration.
- Do not manually reformat unrelated files.
- Keep imports organized.
- Remove unused variables and imports.

## 7. Comments
Write comments to explain WHY, not obvious WHAT.

Good:
// Retry once because the provider occasionally returns a transient 503.

Avoid:
// Increment count
count++;

## 8. Before Finishing
- Run linting.
- Run type checking.
- Run relevant tests.
- Check responsive layouts when UI was changed.
- Remove debugging logs and dead code.
