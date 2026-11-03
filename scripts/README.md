# Safe development samples

Run `GREENSWITCH_TEST_BACKEND=true bun scripts/seed-development.ts` only against an isolated local test backend, with its normal server-side environment bindings. The script refuses hosted URLs, creates no auth accounts or admin credentials, is repeatable, and marks every sample record `is_demo=true` and DEMO DATA. It claims no certifications.

Seeded rows are visible only to administrators in the test backend; they are deliberately excluded from the public real-product catalogue. Use the development demo catalogue in the preview for an immediately viewable fictional example. That catalogue is disabled in published builds.

The first administrator must be assigned by a trusted operator after a real account exists. There is no public admin signup or seeded administrator.
