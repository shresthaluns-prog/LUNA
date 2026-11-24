# Development Phases and Delivery Roadmap
## MERN Jewellery E-commerce Application

- **Delivery approach:** Incremental, testable phases
- **Business model:** Single-vendor
- **Payment:** COD only
- **Audience:** Nepal and international

Do not begin a later phase merely because its files or headings exist. Complete the acceptance criteria for the current phase first.

---

## Phase 0 — Decisions and project foundation

### Tasks
- Confirm brand name, domain, logo, and visual direction.
- Confirm base currency and whether multi-currency display is required.
- Confirm delivery coverage and COD serviceability for Nepal and international destinations.
- Confirm shipping fees, delivery estimates, taxes/customs, returns, cancellation, and COD collection process.
- Decide guest checkout and cart persistence.
- Create Git repository and root documentation.
- Agree on package manager and supported Node version.

### Acceptance criteria
- Open business decisions are recorded in `memory.md`.
- `PRD.md`, `architecture.md`, `rules.md`, `phases.md`, and `design.md` agree.
- No unverified international COD promise is made.

## Phase 1 — Repository and MERN setup

### Tasks
- Initialize root, `client`, and `server` projects.
- Configure React + Vite and Express.
- Configure environment variable loading and `.env.example`.
- Connect MongoDB.
- Add health endpoint and centralized error handling.
- Configure CORS for local development.
- Add lint/format scripts and basic tests.
- Add README setup instructions.

### Acceptance criteria
- Client starts locally.
- API starts locally.
- API can connect to the development database.
- Health endpoint responds.
- No secrets are committed.
- Client production build and client/server test, lint, and format scripts work. The plain Node.js server has no separate compilation step.

## Phase 2 — Design system and public shell

### Tasks
- Add design tokens, typography, buttons, inputs, badges, cards, and container primitives.
- Build responsive header, navigation, mobile menu, and footer.
- Create `client/public/images/` folders: `gold/`, `silver/`, `artificial/`, `diamond/`, `banners/`, and `categories/`.
- Use only owner-provided photos. Inspect image folders and filenames before use; do not assume unclear filenames identify a product.
- Implement shared responsive breakpoints and test the shell at 320, 375/390, 768, 1024, and 1440 px.
- Build home page layout with hero, category navigation, featured collection, and brand content.
- Add loading, empty, and not-found patterns.
- Add policy/contact page placeholders only where content is awaiting owner approval.

### Acceptance criteria
- Layout works on mobile, tablet, and desktop.
- Keyboard focus and semantic navigation work.
- UI follows `design.md`.
- Image URLs use root-relative public paths (for example, `/images/gold/gold-ring-01.jpg`), never filesystem paths.
- No generated, downloaded, stock, or unrelated images are presented as actual products; use a neutral replaceable placeholder when an approved photo is unavailable.
- No fake actions or invented policy claims are present.

## Phase 3 — Catalogue and product details

### Tasks
- Create and seed the four required categories.
- Implement Product and Category models, indexes, and validators.
- Implement public category/product endpoints.
- Implement pagination, search, filtering, and sorting.
- Build catalogue page and product cards.
- Build product detail page and image gallery.
- Store each product's images as an ordered array of URLs and relevant metadata in MongoDB. Use those product-data URLs dynamically across cards, details/galleries, cart, and admin screens; do not duplicate image URLs in components.
- Support a primary/cover image and additional front, alternate, detail, and lifestyle views when supplied. Provide a neutral placeholder when no product photo is available.
- Add optional variants and category-specific attributes.
- Add admin product create/edit/publish/archive basics if admin foundation is ready.

### Acceptance criteria
- All four categories can be browsed.
- Product details display accurate stored data.
- Product imagery is selected from owner-provided files only; any unclear product-to-photo match is confirmed before use.
- Products support multiple ordered image URLs with a designated primary image, and all relevant storefront views use the stored product data.
- Search/filter/sort/pagination work and are validated server-side.
- Unpublished/archived products are not exposed as purchasable public products.
- Product data does not fabricate precious-metal or gemstone claims.

## Phase 4 — Authentication and customer account

### Tasks
- Implement registration, login, logout, and current-user endpoint.
- Hash passwords and configure secure session cookies.
- Implement role authorization.
- Build login/register screens.
- Build profile and address book.
- Add rate limiting and auth validation.
- Add customer/admin route guards in the UI, while retaining server authorization.

### Acceptance criteria
- Customer can register, log in, log out, and view own profile.
- Passwords are never stored or returned in plaintext.
- Admin endpoints reject customer and unauthenticated requests.
- Customer cannot access another user's data.

## Phase 5 — Cart and wishlist

### Tasks
- Implement the chosen cart persistence strategy.
- Add/update/remove cart items.
- Add/remove wishlist items.
- Validate product/variant availability.
- Build cart and wishlist screens.
- Add quantity and unavailable-item handling.

### Acceptance criteria
- Cart quantity cannot exceed available stock.
- Wishlist is private to the signed-in customer (unless guest wishlist is explicitly implemented).
- Cart display is not treated as final price/stock authority.
- Checkout will revalidate all data server-side.

## Phase 6 — COD checkout and order lifecycle

### Tasks
- Implement address validation.
- Implement configurable COD serviceability by destination.
- Implement shipping calculation only from approved configuration.
- Recalculate item prices, totals, and stock on the server.
- Create order snapshots and unique order numbers.
- Implement stock reservation/decrement strategy.
- Build checkout review and order confirmation screens.
- Implement customer order history/detail.
- Implement admin order list/detail and valid status transitions.
- Record order status history and COD collection status.

### Acceptance criteria
- Customer can place COD order only for configured serviceable destinations.
- Unsupported international destinations receive a clear explanation and support path.
- No online payment option appears.
- Server recalculates totals and checks stock.
- Stock cannot become negative under concurrent checkout.
- Order snapshots remain readable after product changes.
- Customers can view only their own orders.

## Phase 7 — Admin operations

### Tasks
- Build protected admin layout and dashboard.
- Complete product and inventory management, including add/edit/reorder/remove product image URLs and selecting the primary image.
- Prepare production image handling for authorized Cloudinary uploads; store image URLs and relevant metadata in MongoDB Atlas, not image binaries.
- Complete order management and status history.
- Add category management if needed.
- Add delivery/COD configuration interface.
- Add basic reporting for order counts and sales summaries.

### Acceptance criteria
- Only admins can access admin screens and APIs.
- Admins can manage multiple product image URLs, and production uploads use Cloudinary rather than MongoDB binary storage.
- Product and order changes are validated and auditable.
- COD configuration is not editable by public users.
- Dashboard summaries exclude or separately identify cancelled/returned orders.

## Phase 8 — Quality, security, and launch readiness

### Tasks
- Add unit and integration coverage for critical services.
- Test authorization, validation, stock concurrency, and COD destination rules.
- Test mobile/desktop layouts and accessibility at 320, 375/390, 768, 1024, and 1440 px.
- Verify product photos are optimized, correctly cropped, responsive, lazy-loaded where appropriate, and have accurate alt text.
- Optimize images, loading, and catalogue performance.
- Configure production CORS, cookies, HTTPS, secrets, and rate limits.
- Configure backups, monitoring, and error reporting.
- Prepare privacy, terms, shipping, returns, and contact content with business approval.
- Deploy client, API, and database.
- Run production smoke tests.

### Acceptance criteria
- Critical user journeys pass in production-like testing.
- No known critical/high security issue remains open.
- Backup and restore process is documented.
- Store policies and international delivery/COD coverage are approved and published.
- Production secrets are not exposed to the browser or repository.

---

## Suggested build order

Recommended sequence is Phase 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8. Some work can overlap only when its dependencies are stable. For example, admin product management depends on product models and admin authorization.

## Phase completion report template

For each phase, record in `memory.md`:

```markdown
## Phase N — [Name]
- Status: Not started | In progress | Blocked | Complete
- Completed:
  - ...
- Tests/checks:
  - ...
- Files changed:
  - ...
- Known issues:
  - ...
- Next task:
  - ...
```

A phase is complete only when its acceptance criteria are demonstrated, not simply when code has been generated.
