# Planned: Recruiter Outreach

Add an account-owned tracker for emails sent to recruiters, with manual entry and agent-assisted imports. Follow the existing Job Applications frontend design; outreach will not count toward application requirements.

| Area | Planned additions and changes |
| --- | --- |
| Frontend | Add a recruiter outreach page and tracker component, modeled on `app/job-board/applications/ApplicationsTracker.jsx`, with bulk entry, search, date filters, editing, and deletion. Add navigation and permission-gated access. |
| Database | Add a migration in `supabase/migrations/` creating `recruiter_emails`: owner, recipients, company, position, subject, sent date, notes, and source identifiers/link. Add owner-only read policies, API-controlled writes, indexes, summary counts, and the `recruiter_emails.use` permission. |
| Duplicate protection | Enforce uniqueness by owner, provider, mailbox, and message ID. Retain minimal source identifiers after deletion so later scans do not restore deleted imports. |
| API | Add `app/api/v1/recruiter-emails/route.js` and `[id]/route.js` for listing, single/bulk creation, reading, updating, and website-only deletion. Reuse existing authentication and return per-row import results. |
| Shared logic | Add validation and access helpers under `lib/recruiter-emails/`; extend `lib/memberAccess.js` for the new permission. |
| MCP | Extend `supabase/functions/ktp-new-brunswick-mcp/index.ts` with list, read, add, bulk-add, and update tools. The agent reads sent mail through a separately authorized email connection and uploads metadata through KTP. |
| Documentation | Update `app/components/ApiKeysPanel.jsx`, `app/api/v1/openapi/route.js`, and API/MCP documentation with import instructions, fields, limits, and retry behavior. |
| Tests | Add validation, access, ownership, duplicate/retry, and deletion tests under `lib/recruiter-emails/__tests__/`. Review and account testing. |

