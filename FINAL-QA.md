# GreenSwitch final quality review

Date: 3 November 2026. Existing design and records preserved; no hosted fictional accounts, products, orders or rewards were inserted. No publication was performed.

## Working features checked
- Disposable localhost database, loaded with **all 20 migrations**: simulated restaurant and supplier signup triggers; independent supplier/business approval; supplier product creation, administrative publication and anonymous catalogue readback. A **pending** supplier can create and manage draft products, cannot publish them, and anonymous visitors cannot see them.
- Five concurrent simulated restaurant buyers committed **1,000 containers each** to a **5,000-container** campaign at **₪0.60/unit**: exactly five **₪600** requests, total **₪3,000**; duplicate participation did not duplicate requests and capacity was enforced.
- Cart request at **₪750**, stock reservation, idempotent retry, private buyer readback and supplier fulfillment through Delivered.
- Paper/cardboard pickup, assignment, partner acceptance/scheduling, simulated receipt metadata, actual-weight recording, independent admin verification: **15 kg → 150 points exactly once**. Plastic requests and partner self-verification were rejected.
- Public sanitized leaderboard readback, opt-out, simultaneous redemptions without overspending, two distinct closed-month snapshots and repeated finalization without duplicate prizes.
- Top-three **20%/15%/10%** monthly vouchers, independent review, supplier consent, **₪100** cap: the ₪750 request became **₪650**, and retry after supplier acceptance preserved that result.
- Buyer/supplier/partner admin denial, explicit admin access, suspension/RLS/mutation blocking, reactivation, private audit records, immutable audit history and role-management safeguards.
- Existing unit tests cover exact decimal costs, pack/MOQ rounding, discount tiers, user-supplied baseline-weight impact estimates and grounded catalogue filtering. These tests do not establish real AI inference.

## Fixes delivered
1. Administrator supplier-role grants now provision the missing **pending** supplier profile transactionally; no automatic supplier approval.
2. Independent administrators can revoke recycling approval while its buyer is suspended; reactivation does not undo that revocation.
3. An already-applied voucher can be retried after normal order progression without failing or discounting twice.
4. Hosted function permissions differed from committed migration intentions: raw recycling rankings were callable by anonymous/signed-in clients and include account identifiers. Explicit grants were revoked; the sanitized public board continues to work. Trigger-only/internal functions and anonymous group mutations were also tightened. Hosted privilege readback confirms raw rankings are inaccessible to both client roles.
5. Removed the incorrect PLA-lid alternative from the home example, explicitly labeled the simulated example, translated its rows and plastic-free caption, and corrected outdated advisor/impact descriptions without changing layout.
6. Administrator test fixture source keys are unique so repeated isolated runs do not collide.
7. Pending suppliers were blocked from the product form by an interface gate and by a database safeguard that rejected every product write until approval. Both now permit draft management while keeping publication restricted to approved suppliers; the hosted signed-in supplier saved a real draft product successfully, and the signed-out marketplace does not show it.

## Tests actually run
- **47 tests passed across 8 files**, including cost, impact, commerce, group, recycling, account/admin and routing tests; rerun after changes.
- `scripts/test-final-journey.py`: passed after loading every final migration into a fresh isolated database; before fixes, it reproduced all three approval/role/voucher defects. New assertions cover pending-supplier draft creation, publication denial and anonymous invisibility.
- Hosted browser check: the signed-in pending supplier's product form now renders, saves a real draft product and returns to the product list without console errors; the signed-out marketplace does not list that product.
- `scripts/test-admin-flow.py`: passed against the fully migrated isolated database.
- **60 browser states**: 15 public/protected paths × English/Arabic × 1280×1800 and 438×682. No page runtime errors, unexpected alerts or horizontal overflow. Arabic document language/direction verified. Inspected screenshots of registration, recycling and calculator.
- Signed-out dashboard/admin paths redirected to `/auth`; this is **not** signed-in dashboard verification.
- **28 content-route files** inspected for individual title, description, Open Graph and Twitter metadata; required fields present.
- Latest automatically managed preview build: **build OK**. No manual production build was run.
- Basic security scan and database linter run. Deep security scan completed with **zero code findings**, no checks disabled. Scanner results do not prove the application secure.

## Not fully implemented
- Contact form, privacy policy and terms remain clearly marked coming soon.
- Orders are purchase requests, not online payments, by design.

## Tests not performed / remaining uncertainty
- Hosted backend now has registered accounts (including one owner-designated administrator and one pending supplier with one real draft product). Hosted restaurant registration-confirmation, independent admin approval in the interface, buyer ordering and the full signed-in UI journey remain unverified. An isolated database simulation is not an authenticated browser session.
- Actual email delivery, confirmation links and emailed recovery links; hosted account provider settings were not independently read.
- Actual product/verification/collection uploads and renewable signed-link readback. Local receipt rows simulate metadata only, not binary storage uploads.
- Signed-in buyer/supplier/recycling/admin forms, charts, mobile/Arabic panels, cart/order/campaign/private-history readback.
- Actual AI response and signed-in recommendation history with approved catalogue products.
- No live monthly reward run, hosted concurrent transaction load test, deployment or post-publication verification.

## Remaining findings and boundaries
- No additional reproduced critical workflow defect remains in the checks performed.
- Basic scanner still flags SELECT access to category names (intentionally public), reward configuration and supplier discount consent (intentionally shared with active signed-in accounts, no private contact/evidence fields). Restrictive active-account policies remain enforced; these flags were reviewed, not suppressed.
- Account suspension cannot retract already issued short-lived signed links before expiry. Failed legacy transaction calls cannot preserve rolled-back audit rows.

## Publication blockers
1. A real registered owner-designated administrator and approved buyer/supplier/recycling-company accounts are required to finish the hosted signed-in journey; an approved real catalogue product is required for ordering and AI checks.
2. Verify actual email and private file workflows and signed-in mobile/Arabic dashboards.
3. Supply final privacy policy and terms before opening real account/order flows; implement or retain the honest contact placeholder.
4. Confirm commercial reward/voucher conditions with participating suppliers; current promotional values are demonstration defaults.

**Readiness:** Focused fixes and available checks pass; full operational publication readiness is not yet established. No authentication shortcuts or fictional hosted activity were used.