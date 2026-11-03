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
