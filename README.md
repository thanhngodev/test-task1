Product Search & Order – Frontend Test
1. How to Run
Prerequisites

Node.js v20.18.0
npm (or yarn / pnpm)

Install & Run
npm install
npm run dev

Open browser at:
http://localhost:5173

2. State Management

This project uses React built-in hooks for state management, as the scope is small and does not require external libraries.
Container-driven logic
Business logic (filtering, debounce, cart updates) lives in App.tsx.

Presentational components
Components like ProductCard and SearchFilter receive typed props and do not own global state.

Debounced Search
A custom useDebounce hook is used to debounce search input, reducing unnecessary re-renders and simulating real-world API behavior.

3. Component Structure
src/
 ├─ components/
 │   ├─ ProductList.tsx
 │   ├─ ProductCard.tsx
 │   ├─ CartSummary.tsx 
 │   └─ SearchFilter.tsx 
 │
 ├─ hooks/
 │   └─ useDebounce.ts
 │
 ├─ data/
 │   └─ products.ts
 │
 ├─ types/
 │   └─ product.ts
 │
 ├─ utils/
 │   └─ common.ts
 │
 └─ App.tsx

4. Responsive Design Decisions
The UI is built with mobile-first principles using Tailwind CSS.
Layout Behavior
### Mobile
Single-column layout
Product list stacked vertically
Cart summary appears below the product list

### Desktop (≥ md)
Two-column layout:
Left: Product list
Right: Sticky cart summary
Improves usability for large screens

### Quantity Control UX
+ / - buttons for quick interaction
Buttons automatically disable at limits (0–99)
Manual input still allowed with validation feedback
Error message shown inline for invalid input