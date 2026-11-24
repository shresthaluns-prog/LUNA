# Application Architecture
## MERN Jewellery E-commerce Application

- **Version:** 1.0
- **Architecture style:** Modular monolith, REST API
- **Business model:** Single-vendor
- **Payment:** COD only, destination-serviceability controlled

---

## 1. Architecture goals

- Keep the React client and Express API independently organized.
- Use clear boundaries between routes, controllers, services, models, and validation.
- Centralize business rules in backend services.
- Make authentication, authorization, inventory, and order processing testable.
- Keep the initial system simple: one deployable frontend and one deployable API, backed by MongoDB.

## 2. Technology choices

| Area | Choice | Notes |
|---|---|---|
| Frontend | React + Vite | Component-based SPA |
| Language | JavaScript initially | TypeScript can be adopted if agreed before implementation |
| Styling | Tailwind CSS | Shared design tokens and reusable components |
| Routing | React Router | Public, customer, and admin routes |
| Server state | TanStack Query | API fetching, caching, invalidation |
| Local/UI state | React Context or small local state | Avoid putting all state in a global store |
| Backend | Node.js + Express | REST API |
| Database | MongoDB Atlas + Mongoose | Managed cloud database, schemas, indexes, validation |
| Authentication | JWT in secure httpOnly cookie | Configure secure, sameSite, CORS and CSRF strategy correctly |
| Password hashing | bcrypt | Never store plaintext passwords |
| Validation | Zod or Joi | Validate request bodies, params, and query strings |
| Image storage | Cloudinary | Keep credentials server-side |
| Testing | Vitest/React Testing Library; Jest or Vitest + Supertest | Test client and API |
| API documentation | OpenAPI/Swagger (recommended) | Keep endpoint contract current |

Do not add Redux, payment SDKs, microservices, or extra infrastructure without a demonstrated requirement. COD means no payment gateway is needed for this release.

## 3. High-level system

```text
Browser
  |
  | HTTPS
  v
React + Vite application
  |  React Router / components / query cache
  |
  | REST JSON requests (cookie-based auth)
  v
Express API
  |
  +-- Routes
  +-- Authentication & authorization middleware
  +-- Request validation
  +-- Controllers (HTTP mapping only)
  +-- Services (business rules and workflows)
  +-- Mongoose models
  |
  v
MongoDB

Express API ----> Cloud image storage (e.g. Cloudinary)
```

The frontend must never connect directly to MongoDB or hold database credentials. The browser must not be trusted to calculate final totals, authorize roles, or set order status.

## 4. Repository layout

Recommended monorepo:

```text
jewellery-store/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── router.jsx
│   │   │   └── providers.jsx
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   └── product/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── catalogue/
│   │   │   ├── cart/
│   │   │   ├── wishlist/
│   │   │   ├── checkout/
│   │   │   ├── orders/
│   │   │   └── admin/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── services/
│   │   ├── styles/
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── constants/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── tests/
│   ├── .env.example
│   └── package.json
│
├── docs/                     # Optional future technical documents
├── PRD.md
├── architecture.md
├── rules.md
├── phases.md
├── design.md
├── memory.md
├── .gitignore
└── README.md
```

Keep feature-specific frontend code inside its feature folder. Backend folders should have a clear responsibility; do not create empty abstractions just to match the tree.

## 5. Backend module responsibilities

- **routes:** Declare endpoints and attach middleware.
- **controllers:** Read validated request data, call services, and format HTTP responses.
- **services:** Implement business workflows and domain rules.
- **models:** Define MongoDB schemas, indexes, and persistence constraints.
- **middleware:** Authentication, authorization, validation integration, rate limiting, error handling, and request IDs.
- **validators:** Request schemas for body, params, and query.
- **utils:** Small reusable helpers; avoid putting domain logic here.

Example order flow:
1. Route applies authentication and request validation.
2. Controller calls `orderService.createCodOrder`.
3. Service loads current product/variant prices and stock.
4. Service validates the customer's address against COD serviceability.
5. Service calculates totals on the server and creates an immutable order-item snapshot.
6. Service safely updates/reserves inventory and creates the order using a MongoDB transaction where supported by the deployment.
7. Controller returns the order reference and safe response fields.

If transactions are unavailable in the chosen MongoDB environment, design and test a safe alternative with atomic stock updates and compensating behavior. Do not assume a multi-document transaction will work on every local MongoDB setup.

## 6. Data model proposal

Use Mongoose schemas. Names and fields below are a starting contract, not a reason to overcomplicate the MVP.

### User
- `name`
- `email` (normalized, unique index)
- `passwordHash`
- `phone`
- `role`: `customer | admin`
- `addresses[]`
- `isActive`
- timestamps

Never return `passwordHash` in API responses.

### Category
- `name`
- `slug` (unique)
- `description`
- `image`
- `isActive`
- `sortOrder`

Seed the four required categories: Gold, Silver, Artificial/Fashion, and Diamond jewellery. Use stable slugs.

### Product
- `name`, `slug`, `sku`
- `categoryId`
- `shortDescription`, `description`
- `images[]` with URL, accurate alt text, view/role where useful, ordering, primary marker, and provider metadata (such as Cloudinary asset ID)
- `price` stored as an integer in the smallest supported currency unit, with explicit `currency`
- `material`
- `attributes` for category-specific specifications
- `variants[]` (optional), each with variant SKU/options/price override if allowed/stock
- `stockQuantity` for non-variant products
- `isPublished`, `isArchived`
- timestamps

Define one consistent price strategy before implementing variants. Never use floating-point arithmetic for money. Do not treat user-supplied product attributes as verified claims.

### Wishlist
- `userId`
- `productIds[]` or a separate wishlist-item collection
- timestamps

Choose one representation and enforce uniqueness.

### Cart
- Persist guest carts in the browser and merge them into the customer's database cart on sign-in.
- Require sign-in to place an order.
- Regardless of cart persistence, the server revalidates products, variants, prices, and stock during checkout.

### Order
- `orderNumber` (unique, non-sequential/randomized enough to avoid easy enumeration)
- `userId`
- `items[]` snapshot: productId reference where available, productName, SKU, selected options, image URL, unit price, quantity, line total
- `currency`
- `subtotal`, `shippingFee`, `discountTotal` (only if promotions are implemented), `grandTotal`
- `paymentMethod: cod`
- `paymentStatus`: `unpaid | collected | collection_failed | refunded` (only use states supported by actual operations)
- `orderStatus`
- `shippingAddress` snapshot
- customer contact snapshot
- status history / audit entries
- timestamps

An order must remain understandable if its source product is edited or archived later.

### Store settings / delivery configuration
- Supported destination country/region.
- COD enabled/disabled.
- Serviceability rules or postal-code/region coverage.
- Shipping fee and currency rules, if configured.
- Updated by and timestamps.

Do not expose private configuration or admin-only fields publicly.

## 7. API conventions

Base path: `/api/v1`

Use JSON and consistent response envelopes.

Example success:
```json
{
  "success": true,
  "data": {},
  "message": "Request completed"
}
```

Example error:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please check the submitted fields",
    "details": []
  }
}
```

Suggested endpoint groups:

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/products` | Public | List/search/filter products |
| GET | `/products/:slug` | Public | Product details |
| GET | `/categories` | Public | Active categories |
| POST | `/auth/register` | Public | Register |
| POST | `/auth/login` | Public | Sign in |
| POST | `/auth/logout` | Authenticated | Clear session |
| GET | `/auth/me` | Authenticated | Current user |
| GET/PATCH | `/users/me` | Customer | Profile |
| GET/POST/PATCH/DELETE | `/users/me/addresses` | Customer | Address book |
| GET/POST/DELETE | `/wishlist` | Customer | Wishlist |
| GET/POST/PATCH/DELETE | `/cart` | Customer or selected cart strategy | Cart |
| POST | `/orders` | Customer | Place COD order |
| GET | `/orders/me` | Customer | Own orders |
| GET | `/orders/me/:orderNumber` | Customer | Own order detail |
| GET/POST/PATCH | `/admin/products` | Admin | Product management |
| GET/PATCH | `/admin/orders` | Admin | Order management |
| GET/PATCH | `/admin/settings/delivery` | Admin | COD/delivery configuration |

Use pagination parameters such as `page` and `limit`, with server-enforced maximums. Validate and allowlist sort/filter fields; never pass arbitrary client query objects directly into MongoDB.

## 8. Authentication and security design

- Prefer short-lived access JWT in an `httpOnly`, `secure` cookie in production.
- Set `sameSite` deliberately for the deployment topology.
- If cross-site cookies are required, implement CSRF protection and strict origin checks.
- Keep JWT secrets in environment variables and rotate them if exposed.
- Hash passwords with bcrypt or argon2.
- Rate-limit login and registration endpoints.
- Validate all inputs and normalize email.
- Use role-based middleware on every admin endpoint.
- Enforce ownership checks for customer resources.
- Configure CORS for known frontend origins only.
- Use Helmet and appropriate security headers.
- Avoid logging tokens, passwords, full payment/customer data, or secrets.
- Use safe image-upload constraints: allowed types, size limits, and server-side authorization.
- Do not trust a role, price, stock, total, or order status sent by the browser.

## 9. COD, money, and internationalization

- COD is the sole payment method in this release.
- Keep payment method explicit in the order schema; do not create a fake payment integration.
- Maintain a configurable allowlist of destinations where COD is genuinely supported.
- Initial fulfilment is limited to Nepal. Keep checkout disabled until specific delivery areas and COD routes have been verified and configured.
- For unsupported international destinations, block COD checkout and show a helpful message/contact route.
- Use NPR as the initial base/display currency, store currency with each order, and do not automatically convert currencies.
- Use integer minor units for money and format amounts using `Intl.NumberFormat`.
- Do not perform automatic currency conversion unless a reliable exchange-rate source and business rules are approved.
- Shipping, taxes, customs duties, and returns are business policies that must be finalized before launch.

## 10. Image handling

- Product images should be uploaded by authorized admins.
- Store provider asset identifiers and secure URLs, not image binaries in MongoDB.
- Validate MIME type, file size, and dimensions where practical.
- Generate responsive image sizes and use lazy loading on catalogue pages.
- Keep descriptive alt text.
- Avoid deleting an image asset while a product/order still references it.

## 10A. Owner-provided jewellery photo assets

During initial development, place owner-provided, approved product photos in the Vite public directory:

```text
client/
└── public/
    └── images/
        ├── gold/
        ├── silver/
        ├── artificial/
        ├── diamond/
        ├── banners/
        └── categories/
```

Use descriptive, stable filenames, for example `gold-ring-01.webp` and `diamond-pendant-side.webp`. Reference public assets from the React app with root-relative paths such as `/images/gold/gold-ring-01.webp`. Do not put product inventory photos in source-code component folders.

Inspect the available image folders and filenames before assigning photos to products. Do not infer a product match from an unclear filename; ask the owner to confirm. Keep image URLs in each MongoDB product's `images[]` data and render them dynamically in cards, product galleries, cart views, and admin screens rather than repeating URLs in components. The admin product form must allow adding, editing, reordering, and removing image URLs and selecting the primary image. Show a neutral placeholder when no product photo is available, and make it straightforward to replace that image data later. Never use generated, downloaded, stock, or unrelated images as real product imagery.

For the production/admin workflow, use Cloudinary. Admin uploads should go to that provider; MongoDB should store the secure image URL, provider asset ID, alt text, and primary-image metadata—not binary image data. The local `public/images/` folders are suitable for supplied static assets and development, not a substitute for a managed production upload workflow.

Image guidance:
- Prefer WebP or AVIF for delivery, while retaining the original source files separately.
- Keep a high-quality original and generate appropriately sized responsive derivatives.
- Use consistent product framing and aspect ratios.
- Lazy-load below-the-fold images; prioritize the main hero/LCP image.
- Validate upload type, size, and dimensions on the server.
- Never represent a sample or unrelated image as an actual item for sale.

## 11. Observability and operations

- Centralized error middleware.
- Structured server logs with request ID.
- Health endpoint such as `/api/v1/health`.
- Database connection failure handling and graceful shutdown.
- Production secrets managed by deployment environment.
- Automated database backups and a documented restore procedure before launch.
- Monitor API errors, latency, and failed order creation.

## 12. Environment variables

**Database provider: MongoDB Atlas.** The Express API connects to Atlas through Mongoose. The browser must never connect directly to the database.

Create a dedicated Atlas application database user with least-privilege permissions. Store the Atlas connection string only in the server's environment:

```env
# server/.env — never commit this file
MONGODB_URI=mongodb+srv://<db-user>:<db-password>@<cluster-host>/<database-name>?retryWrites=true&w=majority
```

- Use separate development, test, staging, and production databases; never run destructive tests against production.
- Configure Atlas Network Access for the API host's outbound IP addresses when stable egress IPs are available. Avoid `0.0.0.0/0` as the default; if hosting constraints require it, document the exposure and use strong, unique credentials.
- Keep `.env` out of version control. `.env.example` must contain safe placeholders only.
- Never put `MONGODB_URI` in React/Vite variables or expose it to the browser.
- Configure connection timeouts, startup failure handling, graceful shutdown, and an Atlas backup/restore procedure.
- Verify transaction behavior on the selected Atlas deployment before relying on multi-document transactions.

Provide `.env.example` files containing names and safe placeholders only.

Server example:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=
CLIENT_ORIGIN=http://localhost:5173
JWT_SECRET=
JWT_EXPIRES_IN=15m
COOKIE_NAME=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Client example:
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

Never commit real `.env` files. Any `VITE_` variable is public to the browser and must never contain secrets.

## 13. Testing strategy

- Unit-test services and utility functions.
- Integration-test API routes and database behavior.
- Test authorization and ownership boundaries.
- Test price/stock revalidation, COD serviceability, and order status transitions.
- Test responsive UI and key customer journeys.
- Use isolated test database/configuration; never run destructive tests against production.
