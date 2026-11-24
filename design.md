# Design System and UI Guidelines
## MERN Jewellery E-commerce Application

- **Visual direction:** Luxury minimalism
- **Brand personality:** Elegant, refined, trustworthy, warm
- **Audience:** Nepal and international jewellery shoppers
- **Primary experience:** Mobile-first responsive e-commerce

This document defines the initial visual baseline. Brand assets and exact final values can be adjusted after the business confirms its identity.

---

## 1. Design principles

1. Let jewellery photography lead; interface elements should support rather than compete with products.
2. Use generous whitespace and clear hierarchy.
3. Create a calm, premium experience rather than a crowded discount-store appearance.
4. Keep product information and purchase actions easy to find.
5. Use consistent spacing, typography, color, and component behavior.
6. Make every page responsive, accessible, and usable with touch or keyboard.
7. Avoid unsupported claims such as “certified”, “pure”, or “authentic” unless verified product data is supplied.

## 2. Initial color palette

| Token | Suggested value | Usage |
|---|---|---|
| `color-ivory` | `#F8F5EF` | Main warm page background |
| `color-white` | `#FFFFFF` | Cards, forms, clean surfaces |
| `color-champagne` | `#D6B779` | Restrained accent and highlights |
| `color-charcoal` | `#25221F` | Main text and dark surfaces |
| `color-taupe` | `#B8A99A` | Secondary decorative accent |
| `color-muted` | `#746F69` | Secondary text |
| `color-border` | `#E8E1D7` | Dividers and borders |
| `color-success` | `#287A55` | Success states |
| `color-error` | `#B42318` | Error states |
| `color-warning` | `#9A6700` | Warning states |

Use champagne gold as an accent, not as the default color for long text. Maintain sufficient contrast. Validate final combinations for WCAG AA where applicable.

## 3. Typography

Suggested pairing:
- **Display/headings:** Playfair Display (or a similar refined serif).
- **Body/UI:** Inter (or a similarly legible sans serif).

Guidance:
- H1: 40–56 px desktop; 32–40 px mobile.
- H2: 30–40 px desktop; 26–32 px mobile.
- H3: 22–28 px.
- Body: 16 px default.
- Small/supporting text: 13–14 px, with readable contrast.
- Buttons and form labels: 14–16 px, medium weight.

Use a restrained typographic scale. Avoid using too many font weights or all-caps text.

## 4. Layout and spacing

Use a consistent spacing scale based on 4 px:
`4, 8, 12, 16, 24, 32, 48, 64, 80`

- Main content max width: approximately 1200–1320 px.
- Desktop page gutters: 40–64 px.
- Tablet gutters: 24–32 px.
- Mobile gutters: 16–20 px.
- Product grid: 4 columns on wide desktop, 3 on standard desktop, 2 on mobile; adjust based on image/card width.
- Use consistent card gaps and section spacing.
- Keep checkout forms single-column on mobile.

## 5. Shape, borders, and elevation

- Use subtle borders and restrained shadows.
- Suggested card radius: 8–12 px.
- Suggested button/input radius: 6–8 px.
- Use pill shapes only for small filters or status labels when appropriate.
- Avoid heavy shadows, excessive gradients, and decorative borders.
- Ensure hover, focus, disabled, and active states are visually distinct.

## 6. Imagery and product presentation

- Use high-resolution, well-lit product photography with consistent backgrounds.
- Show multiple useful angles where available.
- Use consistent image aspect ratios in catalogue cards (typically square or 4:5).
- Product detail should support a larger gallery with thumbnails.
- Use responsive image sizes and lazy loading below the fold.
- Provide meaningful alt text, for example: “Gold-tone floral pendant necklace on ivory background” only when that description accurately matches the image.
- Never use an unrelated placeholder image as if it were the actual product.
- Do not use AI-generated product imagery to represent real inventory unless the business explicitly approves it and it is clearly accurate to the sold item.

## 6A. Owner-provided photo organization and recommended quantity

During initial development, keep supplied static photos under:

```text
client/public/images/
├── gold/
├── silver/
├── artificial/
├── diamond/
├── banners/
└── categories/
```

Use descriptive filenames with a product identifier or slug, such as `gold-floral-ring-front.webp`, `gold-floral-ring-side.webp`, and `gold-floral-ring-detail.webp`. Reference these files with paths beginning `/images/`. Do not place product photos inside React component folders.

For each individual product, aim for **5 useful photos**:
1. Main/front product view (required).
2. Alternate angle or side view.
3. Close-up showing craftsmanship, stones, texture, or finish.
4. Back/clasp/setting/detail view where relevant.
5. Lifestyle or worn/on-model view, if available and accurately depicts the product.

Minimum launch recommendation: **3 clear photos per product**. A practical range is **4–6 photos per product**; use up to 8 only when each image adds useful information. Rings, earrings, and diamond pieces may benefit from close-ups; necklaces and bracelets may benefit from length, clasp, and worn-scale views. Do not pad a gallery with near-duplicates.

For the overall site, prepare:
- 1–2 strong images per category tile.
- 3–5 approved homepage/collection banner images, if the chosen layout needs them.
- Product image counts based on actual SKU count. For example, 20 products × 5 photos is approximately 100 product photos, plus category and banner images.

Photo preparation:
- Prefer WebP for website delivery; keep original files backed up separately.
- Use consistent lighting, background, crop, and framing within a category.
- Keep the main catalogue image visually consistent (square or 4:5 crop).
- Provide larger detail images for product galleries.
- Use descriptive alt text that matches the actual item.
- Do not alter an image in a way that misrepresents the product's colour, metal, stones, size, or finish.

For a production admin dashboard, move product uploads to the configured image-storage service (Cloudinary is proposed) and store image URLs/metadata in MongoDB Atlas. The local public folder is for supplied static assets and early development.

## 7. Main page patterns

### Home page
1. Announcement strip only if there is a real current announcement.
2. Header with logo, category navigation, search, account, wishlist, and cart.
3. Hero with a clear collection message and one primary call to action.
4. Four category tiles.
5. Featured/new-arrival product grid.
6. Brand story or craftsmanship section using approved content.
7. Trust/service information based on actual policies.
8. Footer with contact, policies, and social links.

### Catalogue page
- Breadcrumbs.
- Category title and short introduction.
- Filter/sort controls.
- Responsive product grid.
- Clear result count and pagination.
- Empty state with a way to clear filters.

### Product detail page
- Gallery on one side and purchase information on the other on desktop.
- Stacked gallery and details on mobile.
- Product name, price/currency, SKU if useful, availability, and verified specifications.
- Variant selection where applicable.
- Add-to-cart and wishlist controls.
- Delivery/COD note based on actual destination serviceability.
- Description, care, and specification sections.

### Cart and checkout
- Clear line items, quantity, and remove controls.
- Distinguish subtotal, shipping, and final total.
- Reconfirm address and COD availability.
- Make the COD-only policy explicit.
- Show errors next to the relevant fields.
- Prevent accidental duplicate submissions and communicate order creation status.

### Admin
- Utility-first layout with clear navigation.
- Tables with search, filters, pagination, and status labels.
- Forms grouped by product information, images, price, stock, and attributes.
- Confirm destructive actions; prefer archive over delete.
- Do not reuse customer-facing decorative layouts when a dense operational interface is more useful.

## 8. Components and states

Build reusable components for:
- Button (primary, secondary, text, destructive).
- Text input, select, textarea, checkbox, radio, and form field.
- Header, footer, navigation, breadcrumbs.
- Product card, product grid, image gallery.
- Price display and stock indicator.
- Category tile.
- Modal/dialog and toast/alert.
- Pagination and filter controls.
- Order status badge and summary.
- Loading skeleton, empty state, error state.

Every interactive component must define:
- Default state.
- Hover state.
- Focus-visible state.
- Active/pressed state.
- Disabled state.
- Loading state where applicable.
- Error/success state where relevant.

## 9. Motion

- Keep transitions subtle, generally 150–250 ms.
- Use motion to communicate state, not as decoration.
- Respect `prefers-reduced-motion`.
- Avoid parallax or large movement that distracts from product imagery.
- Do not delay navigation or purchase actions for animation.

## 10. Responsive behavior

- Mobile-first implementation.
- Navigation collapses into an accessible menu on small screens.
- Product cards remain readable and tappable at 320 px viewport width.
- Filters may use a drawer/sheet on mobile.
- Checkout fields stack vertically on narrow screens.
- Buttons and touch targets should be comfortably usable (aim for at least 44 × 44 CSS px).
- Prevent horizontal overflow.

## 11. Accessibility

- Use semantic landmarks and heading order.
- Associate labels with form controls.
- Provide visible keyboard focus.
- Ensure dialogs trap and restore focus appropriately.
- Provide accessible names for icon-only buttons.
- Do not communicate status using color alone.
- Maintain text contrast.
- Support keyboard operation for menus, galleries, filters, and dialogs.
- Use reduced-motion preferences.
- Test with keyboard navigation and at least one screen-reader workflow.

## 12. Tailwind implementation guidance

Define design tokens in the shared Tailwind/theme configuration or CSS variables. Prefer semantic names such as `bg-ivory`, `text-charcoal`, and `border-soft` over scattered raw hex values.

Example CSS variables:
```css
:root {
  --color-ivory: #F8F5EF;
  --color-white: #FFFFFF;
  --color-champagne: #D6B779;
  --color-charcoal: #25221F;
  --color-taupe: #B8A99A;
  --color-muted: #746F69;
  --color-border: #E8E1D7;
}
```

Do not duplicate tokens across components. If a token changes, update it centrally.
