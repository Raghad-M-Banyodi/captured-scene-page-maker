# Super Admin verification

## Implemented
- `/admin` and existing `/dashboard/admin` use the same existing Dashboard shell. Both require signed-in server-verified active administrator permission before entry. Buyer, supplier and recycling dashboards remain intact.
- Real platform metrics exclude fictional catalogue/order fixtures; products, orders, campaigns, private evidence, partner operating areas, account approvals/statuses, voucher review, monthly competition rules, settings and audit panels are connected to existing data.
- Chart values derive from actual product/order statuses, monthly order requests and verified eligible material weights. No synthetic business activity is shown.
- Sensitive changes are audited through append-only database triggers with actor/time/entity/status snapshots. Admin management failures are recorded without leaking private payloads. Existing direct administrator supplier/product/role/recycling operations also generate audit records.
- Suspension/rejection/pending access disables authenticated RLS access and order/group/recycling administrative RPC mutation paths; reactivation restores access. Active administrator role checks are independently enforced by database functions and protected server reads.
- Role grants require an active independent account; administrators cannot suspend themselves or other administrators through general user controls. No public admin signup or self-assignment.
- Vouchers now require independent administrator review before use, in addition to supplier consent, single-use, expiry and cap checks.

## Verified
- All 47 tests passed, including explicit buyer/supplier/partner denial and active administrator allowance.
- `scripts/test-admin-flow.py` ran with real authenticated roles on a disposable localhost PostgreSQL database loaded with every existing migration. Verified admin read/action denial for buyer/supplier/partner, suspension blocking profile reads/updates and order/group/recycling RPCs, reactivation, self-suspension rejection, partner cities, reward review, private settings and immutable successful/failed audit entries.
- Browser: both administrator URLs redirect signed-out visitors to `/auth`, no private administration appears, recycling remains available, no runtime errors. Preview build OK.
- Hosted backend contains zero registered users. No live credentials, fictional accounts or privileged users were created.

## Not verified on live signed-in UI
An explicitly authorized registered administrator is required for real-data metric readback, review/action forms, uploaded private documents, charts and responsive/Arabic admin-panel screenshots. Signed-out route checks and isolated database security tests do not establish signed-in UI verification. Existing account/order/recycling email and upload verification blockers remain.

## Audit boundaries
Successful sensitive state changes are logged at database level. Failed `admin_manage` operations persist a generic failure row; failed legacy RPC calls roll back their transaction and cannot persist audit rows. Infrastructure authentication logs remain separate. Account suspension does not revoke previously issued short-lived signed file links before their expiry.

## Repeatable isolated test
Use `GREENSWITCH_ADMIN_TEST_DB=true` with localhost `PGHOST` and a disposable database containing all migrations plus minimal auth/storage prerequisites. The script refuses hosted databases and creates fictional rows only locally.
