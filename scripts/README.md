# Safe development samples

Run `GREENSWITCH_TEST_BACKEND=true bun scripts/seed-development.ts` only against an isolated local test backend, with its normal server-side environment bindings. The script refuses hosted URLs, creates no auth accounts or admin credentials, is repeatable, and marks every sample record `is_demo=true` and DEMO DATA. It claims no certifications.

Seeded rows are visible only to administrators in the test backend; they are deliberately excluded from the public real-product catalogue. Use the development demo catalogue in the preview for an immediately viewable fictional example. That catalogue is disabled in published builds.

## Final integrated QA journey
Run `GREENSWITCH_FINAL_QA_DB=true python3 scripts/test-final-journey.py` with localhost `PGHOST` and a disposable database containing every project migration plus minimal auth/storage prerequisites. It tests simulated restaurant registration, independent approvals, supplier publication, five concurrent 1,000-unit commitments, exact purchase requests and fulfillment, collection evidence metadata, points, monthly vouchers and the approval/retry regressions. Evidence rows are simulated metadata, not actual file uploads. AI inference and browser account workflows are not verified by this database test. Use a fresh disposable database for each run; never point it at the hosted backend.

The first administrator must be assigned by a trusted operator after a real account exists. There is no public admin signup or seeded administrator.

## Group transaction simulation
`test-group-concurrency.py` runs only with `GREENSWITCH_GROUP_TEST_DB=true` and a localhost `PGHOST`. It expects a disposable database containing the group functions and minimal test schema. It inserts fictional local-only users/products, simulates five concurrent buyers, verifies exact discounted orders, checks duplicate retries and over-capacity rejection, releases expired/cancelled stock, and checks completion. Never run it against the project database.
