# Product Requirements Document (PRD)
## MERN Jewellery E-commerce Application

- **Document status:** Initial baseline
- **Version:** 1.0
- **Product type:** Single-vendor e-commerce
- **Primary stack:** MongoDB Atlas (cloud database) + Mongoose, Express.js, React, Node.js
- **Audience:** Nepal and international customers
- **Payment policy:** Cash on Delivery (COD) only

---

## 1. Product overview

Build a responsive, trustworthy online jewellery store for one jewellery business. Customers can discover and browse gold, silver, artificial/fashion, and diamond jewellery; view product details; add products to a cart or wishlist; and place orders using Cash on Delivery where the destination and delivery partner support it.

The store owner and authorized staff use an admin area to manage the catalogue, inventory, customers, and orders.

This is **not** a multi-vendor marketplace. There are no seller registrations, seller storefronts, seller commissions, or vendor payouts.

## 2. Goals

1. Present jewellery in a premium, clear, mobile-friendly shopping experience.
2. Make products easy to discover by category, price, material, and other relevant attributes.
3. Provide a reliable cart and COD order-placement flow.
4. Give the store team control over products, stock, and order fulfilment.
5. Support customers in Nepal and international visitors without promising delivery or COD where the business cannot fulfil it.
6. Keep the codebase maintainable and suitable for incremental AI-assisted development.

## 3. Non-goals for the initial release

- Multi-vendor onboarding or seller dashboards.
- Online card, wallet, bank-transfer, or payment-gateway checkout.
- Auctions, bidding, subscriptions, or recurring payments.
- Live courier tracking integrations unless separately approved.
- Automated international customs, duties, or tax calculation.
- Loyalty points, referral programmes, or advanced promotions.
- Native iOS or Android applications.

These can be considered later without assuming they are part of the MVP.

## 4. Users and roles

### 4.1 Guest
- Browse the home page and product catalogue.
- Search, filter, sort, and view product details.
- Add products to a browser-persisted cart; merge it into the account cart on sign-in.
- Register or sign in to place and review orders.
- View store contact, shipping, returns, and policy information.

### 4.2 Customer
- All guest capabilities.
- Manage profile and saved addresses.
- Maintain a wishlist.
- Place COD orders for serviceable destinations.
- View order history and order details.
- Request cancellation or contact support according to store policy.

### 4.3 Admin
- Access a protected admin dashboard.
- Create, edit, publish, archive, and delete products (prefer archive for products with order history).
- Manage categories, product images, variants, SKU, prices, and stock.
- View and update orders through controlled status transitions.
- View customer and address details needed for fulfilment.
- Review low-stock products and basic sales/order summaries.
- Manage operational settings that are explicitly implemented and authorized.

There is one store owner/business. Admin roles may be expanded to staff permissions later, but the initial release can use a single `admin` role.

## 5. Product catalogue

### 5.1 Required product categories
- Gold jewellery
- Silver jewellery
- Artificial / Fashion jewellery
- Diamond jewellery

### 5.2 Product information
A product should support, as applicable:
- Product name and slug.
- SKU or unique stock code.
- Category.
- Short and full description.
- One or more product images, including a primary image.
- For each image: URL, accurate alt text, image/view role where useful, ordering, and provider metadata when applicable.
- Price and currency.
- Material and product type.
- Availability / stock quantity.
- Active or archived status.
- Optional attributes such as weight, purity, stone type, stone carat, size, colour, finish, dimensions, and care instructions.

Do not assume every attribute applies to every category. For example, diamond carat may be relevant to diamond products, while fashion jewellery may use finish or colour.

### 5.3 Variants
The initial design should allow a product to have optional variants such as ring size, chain length, or colour. Stock must be tracked at the correct level: product-level when there are no variants, and variant-level when variants are enabled. Do not allow negative stock.

## 6. Customer-facing features

### 6.1 Home page
- Brand header and primary navigation.
- Hero/featured collection area.
- Category entry points.
- Featured or new-arrival products.
- Brand/story content.
- Trust and service information.
- Footer with contact, policies, and social links.

### 6.2 Catalogue and discovery
- Product listing with pagination or incremental loading.
- Category filtering.
- Search by product name, SKU, or relevant keywords.
- Sort by newest, price low-to-high, and price high-to-low.
- Optional filters for price range, material, and product-specific attributes.
- Clear empty, loading, and error states.

### 6.3 Product detail
- Product image gallery.
- Name, price, description, category, and relevant specifications.
- Variant selection where applicable.
- Stock/availability messaging.
- Add-to-cart and wishlist actions.
- Delivery/COD availability explanation.
- Related products where data is available.

### 6.4 Cart
- Add, remove, and change quantities.
- Validate stock and availability.
- Display item subtotal and order total.
- Revalidate prices and stock on the server at checkout.
- Persist guest carts in the browser and merge them into the customer's database cart on sign-in.
- Require sign-in to place an order.

### 6.5 Wishlist
- Add/remove products.
- View saved products.
- Handle products that become unavailable or archived.

### 6.6 Account
- Registration, login, logout.
- Secure password hashing.
- Profile details.
- Multiple saved delivery addresses.
- Order history and order detail view.

### 6.7 Checkout and COD
- Require customer contact and a complete delivery address.
- Collect country, region/province/state, city, postal code where applicable, and phone number.
- Show a clear COD-only payment method.
- Confirm COD availability for the destination before accepting the order.
- Show shipping charges and delivery estimate only when configured and supportable.
- Require final order review and explicit confirmation.
- Create an order snapshot containing purchased product names, SKUs, variant details, unit prices, quantities, currency, and address.
- Return a clear order confirmation and order reference.

**Important international constraint:** COD is not universally available across borders. The application must not imply that COD is available worldwide. International checkout must be enabled only for countries/regions and courier routes that the business has explicitly configured and verified as COD-serviceable. If no supported international COD route exists, explain that checkout is not currently available for that destination and provide a contact/support route. Do not silently switch to an online payment method.

### 6.8 Orders
Suggested lifecycle:
`pending_confirmation` → `confirmed` → `processing` → `shipped` → `delivered`

Other terminal/exception statuses:
`cancelled`, `failed_delivery`, `returned`

- Customer can see current status and order details.
- Admin can update status with validation and an audit trail.
- Cancellation rules must be configurable or documented before launch.
- Stock reservation/decrement and cancellation restocking rules must be implemented consistently and tested.

## 7. Admin features

### 7.1 Dashboard
- Order counts by status.
- Recent orders.
- Low-stock products.
- Basic revenue/order summaries based on placed orders, clearly distinguishing cancelled/returned orders.

### 7.2 Product management
- Create and edit products.
- Add, edit, reorder, and remove product image URLs; select the primary image and maintain accurate alt text.
- During initial development, use only owner-provided files in `client/public/images/`, referenced by root-relative URLs such as `/images/gold/gold-ring-01.jpg`. Inspect available folders and filenames before assigning a photo to a product; confirm uncertain matches with the owner.
- Keep image URLs and metadata in each product record in MongoDB. Use an image array so a product can have a cover image and additional views.
- In production, store image files in Cloudinary and persist their URLs and relevant provider metadata in MongoDB; never store image binaries in MongoDB.
- Use a neutral, replaceable placeholder when a product has no photo. Never use generated, downloaded, stock, or unrelated imagery as a real product photo.
- Manage categories, variants, SKU, price, and stock.
- Publish, unpublish, or archive products.
- Validate required fields and unique SKU/slug.

### 7.3 Order management
- Search/filter orders by order number, customer, date, and status.
- View order items, totals, delivery address, and customer contact.
- Update order status through allowed transitions.
- Record status changes with actor and timestamp.
- Avoid exposing customer data to unauthorized users.

### 7.4 Store configuration
Provide a secure, admin-only place for operational settings when implemented:
- Store contact information.
- Supported delivery destinations.
- COD serviceability by destination.
- Shipping charges and thresholds.
- Store currency/display rules.
- Policy content.

Do not let public clients directly change these settings.

## 8. Business rules

1. One store owns and fulfils all products and orders.
2. COD is the only checkout payment method in this release.
3. Initial fulfilment is limited to Nepal. Keep checkout disabled for any destination until its delivery and COD serviceability are explicitly verified and configured.
4. Prices, totals, discounts (if introduced), and stock are recalculated/validated on the server.
5. The browser is never the authority for price, stock, role, or order status.
6. A customer can access only their own profile, addresses, wishlist, and orders.
7. Only authorized admins can manage catalogue, inventory, store configuration, and all orders.
8. Product records referenced by historical orders must not be destructively removed in a way that breaks order history.
9. The initial base/display currency is NPR; do not automatically convert currencies. Shipping, tax, and customs policies must be finalized before production.
10. Precious-metal purity, weight, gemstone details, authenticity, certificates, and product claims must be entered and verified by the business; the application must not invent them.

## 9. Quality requirements

### 9.1 Responsive design (mandatory)
- Use a mobile-first layout across the entire customer storefront and admin interface.
- Support narrow phones (320 px and up), common phones (375–430 px), tablets (768 px), laptops (1024 px), and wide desktops (1440 px and above).
- No horizontal page overflow at supported widths.
- Navigation, product grids, filters, galleries, cart, checkout forms, tables, and dialogs must adapt to the viewport.
- Product grids should reduce columns on smaller screens; filters should become an accessible drawer/sheet where appropriate.
- Buttons and touch targets must be comfortable to use on touch screens.
- Images must scale without distortion and use responsive sizing.
- Verify key flows at mobile, tablet, and desktop widths before marking a phase complete.

### 9.2 Other quality requirements
- Responsive from small mobile screens through desktop.
- Accessible semantic HTML, keyboard navigation, visible focus, and useful image alt text.
- Secure authentication and authorization.
- Server-side validation and consistent API errors.
- Pagination and indexed database queries for catalogue/order lists.
- Optimized, appropriately sized product images.
- No secrets committed to source control.
- Automated tests for critical business rules.
- Useful logging without passwords, tokens, or unnecessary personal data.

## 10. Success criteria / acceptance checklist

- A guest can browse all four product categories and open product details.
- Search, filters, sorting, and pagination return correct results.
- A customer can register, sign in, and manage an address.
- A customer can add available products to cart and wishlist.
- Server-side checkout recalculates totals and checks stock.
- COD orders can be placed only for configured serviceable destinations.
- Unsupported international destinations are clearly blocked from COD checkout without offering a fake alternative.
- Customers can see only their own orders.
- Admin can manage products, stock, and order statuses.
- Order history remains readable if a product is later archived.
- Critical flows have automated tests and are manually checked on mobile and desktop.

## 11. Decisions still required before production

The following are deliberately left as business decisions rather than invented requirements:
- Brand logo and domain (the selected brand name is LUNA).
- Exact Nepal delivery coverage and COD courier capability by destination.
- Shipping fees, delivery estimates, and free-shipping rules.
- Tax, customs, and duties responsibilities for international orders.
- Returns, exchanges, warranty, cancellation, and refund policies (COD refund process).
- Product authenticity/certification content and required fields per category.
- Deployment provider.
- Whether customers can cancel orders themselves and until which status.

Record approved decisions in `memory.md` and update this PRD when scope changes.
