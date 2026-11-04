<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Product/supplier data lives in `src/data/products.ts` (demo layer) shaped like future DB tables; swap the source, keep the shapes.
- All UI copy goes through `useI18n()` dictionaries in `src/lib/i18n.tsx` (en/ar); layouts use logical props (ms/ps/start/end) so RTL works.
- Future-phase routes render `ComingSoon` rather than fake functionality; placeholder actions show a toast saying so.
- Real catalogue data is loaded through a public publishable-key server function and adapted to the existing Product/Supplier shapes; static products remain isolated development fixtures.
- Authenticated dashboards live under the client-only _authenticated layout; all private data access is authorized independently by database ownership and role policies.
- Maintain one root account session subscriber, with ordered cache teardown before sign-out; this prevents stale protected data.
- Account dictionaries are composed into useI18n; new account copy belongs in the bilingual account strings module.
- Development seeding refuses hosted backend URLs and never creates credentials, so demo records cannot enter live account flows.
- Purchase requests and fulfillment transitions use authenticated RPC wrappers over atomic database functions; prices, stock reservations, ownership and idempotency remain enforced at the database boundary.
- Product media is stored privately with renewable signed links, and catalogue adapters preserve the existing UI shapes.
- Buyer tools share decimal-based math and authenticated history writes; the advisor may rank allowlisted catalogue IDs with AI, but displayed facts and all costs remain catalogue- or rule-derived.
- Impact history records user-supplied baseline weights as estimates, even when linked to delivered order units, so fulfillment never implies confirmed environmental benefit.
- Group commitments use campaign and product row locks, reserve stock at commitment time and convert each participant once to a discounted order; direct campaign/participant writes are revoked.
- Campaign lifecycle is separate from the deprecated legacy status; expiry is refreshed on reads and joins, and private participant reads use a non-recursive security-definer membership helper.
- Recycling partners and business approval use dedicated protected records rather than registration roles; atomic authenticated RPCs own pickups, immutable points, monthly snapshots and single-use vouchers, with private request-scoped evidence and supplier-consented order discounts.
- Admin surfaces reuse the existing Dashboard shell and working recycling modules; server-verified admin reads, protected account-access records, restrictive active-account RLS/RPC guards and append-only database audit triggers enforce management independently of the UI.
- Administrator supplier-role grants transactionally provision a pending supplier profile; recycling revocations remain possible for inactive targets, and voucher replay validates ownership before distinguishing prior success from new eligibility.
- The final integrated journey test uses a fully migrated disposable localhost database with explicitly simulated records; it never provisions hosted test identities or modifies hosted business data.
- Raw recycling rankings and trigger-only security-definer functions have no client EXECUTE grants; only the sanitized public board exposes competition results.
- Group thresholds unlock pricing; participants explicitly confirm pending requests, while expiry releases only unconverted reservations to preserve existing orders.
- Supplier benefits use the shared points ledger and atomic authenticated redemption; public featuring exposes only eligible product IDs and analytics checks unexpired entitlements server-side.
- Voucher funding is recorded independently of payment and applied atomically with supplier-split checkout; supplier-funded discounts require explicit consent.
