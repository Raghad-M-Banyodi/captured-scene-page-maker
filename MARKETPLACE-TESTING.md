# Marketplace ordering checks

Implemented supplier pricing per piece/pack, available quantity, material composition, ordered volume discounts, private image/PDF uploads and administrator publication review. Public visibility requires approved supplier, reviewed product and confirmed non-plastic material; PLA is excluded.

Cart quantities persist, enforce MOQ/available stock, and show volume-priced totals. Request Order collects delivery details, creates one order per supplier, snapshots authoritative prices and item names, reserves stock atomically, clears the cart, and uses a buyer-scoped idempotency key. Rejection/cancellation releases reserved stock. Order transitions are validated independently of the UI and private order/item reads are ownership-scoped.

## Verified
- 17 unit/regression tests passed across commerce, account rules, filtering and routing.
- Marketplace, cart, orders and development demo pages render with unique metadata and no runtime errors after the final reload.
- Database schema changes were read back; order status constraint includes all seven requested statuses (legacy completed remains deprecated).
- Temporary QA signup accounts were removed. No supplier approval or admin role was applied for QA.

## Not verified end-to-end
Signed-in product creation/upload, buyer submission, multi-supplier splitting, duplicate retries, fulfillment status readback, stock restoration and private-order access isolation still require authenticated testing. Test-account session access was declined; no substitute credentials or permission bypass was used.

## Demo scope
Fictional demo suppliers/products remain separate from the live catalogue. The local-only seed script adds realistic ILS prices, non-plastic composition and wholesale pricing and refuses hosted databases. It was not executed against the live backend. No environmental certificates are fabricated.