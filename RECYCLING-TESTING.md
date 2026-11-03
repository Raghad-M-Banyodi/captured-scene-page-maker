# Recycling and Green Rewards verification

## Verified
- Hosted schema, ownership policies, private evidence bucket and RPCs are installed. Hosted backend has zero registered users; no fictional live accounts, collections, points or vouchers were inserted.
- 40 application tests pass, including 10 concrete recycling policy/rate/time tests.
- Full database flow exercised with authenticated roles on a disposable localhost PostgreSQL database: approved buyer requests 20 kg; independent admin assigns approved partner; partner accepts, schedules, uploads receipt metadata and records actual weight; admin verifies; buyer earns exactly 200 points once; board updates; buyer redeems 100-point 5% vouchers.
- Concurrent redemption accepts two requests against 200 points and rejects a third, balance never negative.
- Plastic, unrelated-partner access, direct ledger/request writes, self-verification, over-verification and recycling-confirmation without evidence are rejected.
- Supplier consent is required to apply a voucher to an eligible pending purchase request. A 5% voucher on ₪5,000 caps at ₪100; replay does not discount twice, incompatible second voucher is rejected. Vouchers do not apply to group-buying orders.
- Opt-out removes public ranking; public responses contain display names only, not account identifiers.
- Closed-month finalization issues top-three 20%/15%/10% rewards once and preserves results. Testing found/fixed an ambiguous monthly SQL comparison.
- Public live empty state, fictional demo podium, EN/AR direction and 438px/1280px layout checked through browser without errors or overflow; preview build OK.

## Not verified end-to-end on hosted accounts
Requires registered buyer, approved recycling business, approved partner and independent administrator. No managed session can be minted while there are zero users. Hosted photo/receipt upload bytes, real signed-link readback, role-specific forms, points readback and voucher redemption through signed-in UI remain unverified. Local storage objects were metadata fixtures, not a hosted upload. No confirmed environmental recycling claims were generated.

## Defaults and operator decisions
The requested demo earning/redemption/winner rates are installed as configurable defaults. Initial voucher validity is 30 days, maximum discount ₪100, minimum order ₪0; these are implementation defaults, not agreed commercial terms. Admin can change them. Supplier consent is explicit; canceled orders do not restore used vouchers. Ranking uses verification month in Asia/Gaza, earliest verification then stable business ID to break ties. Historical snapshots retain original results privately while current opt-out hides names publicly.

## Repeatable isolated test
`scripts/test-recycling-flow.py` requires `GREENSWITCH_RECYCLING_TEST_DB=true`, a localhost `PGHOST`, and a disposable database containing the recycling migrations plus prerequisite account/order/storage schemas. It refuses hosted URLs. It creates isolated fictional rows only in that disposable database.
