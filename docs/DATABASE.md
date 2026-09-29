# DATABASE.md

## 1. Purpose
This file describes how data is modeled and managed in this project.

## 2. Database Stack
Primary database: PostgreSQL
Provider: [Supabase / Neon / other]
ORM: Prisma
Migrations: Prisma Migrate

## 3. Environment
DATABASE_URL must come from environment variables.
Never hardcode a production connection string.

Development, staging and production should use separate databases.

## 4. Core Models

### User
Represents an application user.

Fields:
- id: unique identifier
- email: unique email address
- name: optional display name
- createdAt
- updatedAt

### Project
Represents a project created by a user.

Fields:
- id
- name
- ownerId -> User.id
- createdAt
- updatedAt

Relationship:
One User can have many Projects. Each Project belongs to one User.

## 5. Schema Rules
- Every primary record should have a stable ID.
- Add created/updated timestamps where useful.
- Use foreign keys for relationships.
- Add unique constraints for values that must be unique.
- Add indexes to frequently queried fields when justified.
- Avoid storing the same fact in multiple places without a reason.

## 6. Migrations
When the schema changes:
1. Update the schema definition.
2. Create a migration.
3. Review the generated migration.
4. Test it locally/staging.
5. Apply it through the project's deployment process.

Never manually change the production database just to skip a migration.

## 7. Seed Data
Seed scripts may create development/test data.
Do not include real user data or production secrets in seeds.

## 8. Production Safety
- Back up important data.
- Avoid destructive schema changes without a migration plan.
- Never run reset commands against production.
- Use transactions for operations that must succeed or fail together.
- Follow SECURITY.md for access and sensitive data rules.
