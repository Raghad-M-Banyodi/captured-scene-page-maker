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
