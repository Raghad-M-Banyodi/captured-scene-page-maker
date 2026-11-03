# Buyer analysis tools

The advisor retrieves approved non-demo non-plastic database products before ranking. Deterministic matching respects category, available purchase quantity, budget and supplier tiers. Candidate IDs are allowlisted; AI may reorder them but cannot supply prices, products, material claims or certificates. Displayed explanations are conservative and identify unknown size, temperature and food-safety evidence. Invalid or unavailable AI output uses the labeled filter fallback.

The calculator uses decimal arithmetic for current/alternative monthly costs, annual difference and percentage change. Purchase quantities mean sellable pieces or packs; piece consumption rounds up to packs and respects MOQ. A selected tier is rejected below its threshold. Group savings appear only for an open, unexpired matching campaign and remain conditional on that campaign.

Impact requires a positive buyer-supplied baseline plastic weight and replacement quantity. It calculates grams × units / 1000. Delivered order links verify buyer ownership, delivery status and available delivered units, but do not convert baseline-derived mass into confirmed environmental benefit. Independent estimates and monthly/yearly sums are separate from delivered units. No carbon or recycling rates are claimed.

## Checks completed
- 25 unit/regression tests across buyer tools, commerce, account, filtering and routing.
- Restaurant scenario: 2,000 pieces at ₪0.50 vs ₪0.60 = ₪1,000 vs ₪1,200 monthly, ₪200 monthly difference, ₪2,400 yearly, 20%.
- Cafe pack scenario: 1,001 pieces require 11 packs of 100, ₪495 alternative vs ₪480.48 current cost.
- 12.5 g × 2,000 pieces = 25 kg estimated monthly and 300 kg projected yearly.
- Existing-ID recommendations, budget/stock exclusions, PLA/demo exclusions, tier validation, zero-cost percentage handling and decimal group savings tested.
- All three public pages and Arabic direction checked without browser runtime errors.
- SDK installed, workspace model availability confirmed and model declarations generated for the default Responses model.

## Not verified
There are no registered accounts or eligible live products available in the project at this point. Signed-in history writes/readback, end-to-end recommendations/cart integration, and real AI inference have not been exercised. No demo products or credentials were added to the live catalogue to simulate success. Existing signed-in order verification remains open for the same account prerequisite.