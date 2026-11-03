# Group buying verification

Implemented campaign creation for approved suppliers and public eligible owned products; normal price snapshots, discounted price, target, maximum, start/deadline and lifecycle. Buyers must have a buyer role and confirmed account. Commitments require delivery information and reserve stock atomically. One commitment and one campaign order per buyer are enforced.

The campaign row and product row are locked before quantity checks. Reaching target converts all unconverted commitments to purchase requests at the agreed price; later commitments can join until capacity/deadline. No payments run automatically. Draft/active campaigns may be activated/cancelled by their supplier. Expiry releases pre-target reservations when campaign data is refreshed or a join is attempted. Target-reached campaigns complete once all requests are terminal and capacity or deadline closes participation.

## Verified on an isolated disposable PostgreSQL database
- Exact project group transaction functions loaded from migrations.
- Five concurrent confirmed restaurant buyers × 1,000 containers = 5,000 committed, five businesses, five pending requests at ₪600 each (₪0.60 unit price).
- Retrying the same buyer creates no duplicate commitment or order.
- Three concurrent 1,000-unit attempts against a 2,000-unit maximum accept exactly two and reject one.
- Cancellation and expiration release reserved quantities.
- All delivered requests at capacity complete the campaign.
- Direct campaign/participant writes are revoked from authenticated users.
- Found and fixed an expiration alias bug during the real SQL simulation.

## App checks
- 30 unit/regression tests passed; campaign limits, progress, dates and ILS savings covered.
- Campaign list/detail load their honest empty state with no browser runtime errors.
- Fixed supplier group-price entry to allow prices below ₪1.

## Still unverified
The hosted project has no campaigns and no registered confirmed buyer/supplier flow available for testing. Signed-in UI creation, join, notifications, private history and order readback were not verified end-to-end. The isolated SQL simulation does not substitute for that check. No fictional records were inserted into live account/catalogue flows.

Quantities are the product's sellable units (pieces or packs), matching its price basis. Unreached campaign expiration is processed lazily on reads/joins, not by a scheduled job.