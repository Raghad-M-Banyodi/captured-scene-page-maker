# GreenSwitch account phase verification

## Passed
- Buyer and supplier registration form validation and confirmation-state rendering.
- Real Auth account creation and signup profile/role triggers (test account creation used the managed admin signup endpoint without sending emails to fictional recipients).
- Buyer/supplier password login, hard-refresh session persistence, logout, signed-out dashboard redirects.
- Account settings updates persisted and read back through the UI for both roles.
- Supplier product creation, default pending verification, administrator supplier approval and product publishing.
- Approved published product catalogue, buyer saved-product dashboard and shopping-cart readback.
- Database authorization: supplier cannot read/edit buyer profile, self-grant admin, self-verify, self-publish, or invoke privileged role changes; anonymous clients cannot read pending products or verification documents.
- Reset page rejects a visit without a recovery link.
- Arabic RTL account form at 504 × 682, development-only fictional catalogue, no browser runtime errors.
- Ten automated account-rule, filtering and routing tests.

All temporary QA accounts, records, and temporary administrator role were removed after verification. No administrator credentials are seeded.

## Remaining limitations
- Confirmation email delivery and password update through an emailed recovery link have not been tested with a real recipient. Confirmation remains enabled.
- Verification file upload and signed-document viewing are implemented but have not been exercised end-to-end.
- The first real administrator must be assigned by a trusted operator after the owner identifies their registered account.
- Orders, recommendation history, group campaigns, and environmental impact dashboard tabs display real stored records or empty states. Checkout/order creation, an AI recommendation engine, group campaign creation/joining, automatic impact calculations and advanced analytics are not implemented in this phase.
- The public marketplace contains no fictional seeded records. The separate development demo catalogue is disabled in production; the local seed script refuses hosted URLs.