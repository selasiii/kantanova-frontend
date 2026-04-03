# Kantamanto Noir - Design System & Tailwind Guidance

## 1. Aesthetic Context: Brutalist Luxury
The design merges West African heritage with a stark, modern, "brutalist luxury" aesthetic. It emphasizes high-contrast colors, harsh and deliberate grid layouts, heavy geometric sans-serif typography, and an electric blue accent that starkly breaks the monochrome theme.

## 2. Tailwind Configuration (Design Tokens)

### 2.1 Colors
- **Background Base**: `#FFFFFF`, `#FAFAFA` (Zinc-50 or Gray-50)
- **Primary Text**: `#000000`, `#111827` (Gray-900)
- **Secondary Text (Labels/Meta)**: `#6B7280` (Gray-500)
- **Primary Accent (The "Noir" Blue)**: `#0D52FF` (Very close to `blue-600` or a custom bright ultramarine). Used for all primary actions (buttons), active states, and prices.
- **Borders**: `#E5E7EB` (Gray-200) for structural lines. Black (`#000000`) for high-contrast demarcations and input focuses.

*Update `tailwind.config.js`:*
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          black: '#0a0a0a',
          white: '#ffffff',
          gray: '#f5f5f5',
          blue: '#0D52FF',
          border: '#e5e5e5'
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'], // Or Inter Black / Syncopate
        sans: ['Inter', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
```

## 3. Structural Elements & Layouts

### 3.1 Borders and Dividers
- No soft shadows anywhere (unless for overlays/modals). The UI relies on **hard hairline borders** (`border border-noir-border`) or heavy black borders to section content.
- Forms use bottom-borders only for inputs (`border-b border-black focus:border-noir-blue outline-none`).

### 3.2 Spacing & Grid
- **Paddings**: Generous and airy. Sections should have `py-20` to `py-32`. Components should utilize `p-6` or `p-8`.
- **Layouts**: Half-split horizontal grids (`grid-cols-2`) for desktop log in / form views (left side image, right side form). Masonry or strict columns for product listings.

## 4. Component Blueprints

### 4.1 Buttons
**Primary Blue Button**
- Shape: Sharp corners (no `rounded`).
- Base Tailwind Classes: `bg-noir-blue text-white px-8 py-4 uppercase text-sm font-bold tracking-widest hover:bg-blue-700 transition-colors`

**Ghost Outline Button**
- Shape: Sharp corners.
- Base Tailwind Classes: `border border-noir-black text-noir-black px-8 py-4 uppercase text-sm font-bold tracking-widest hover:bg-noir-black hover:text-white transition-colors`

### 4.2 Form Inputs
- No enclosing box, just an underline.
- Associated Label: `text-xs font-bold uppercase tracking-widest text-gray-800 mb-2 block`
- Input field: `w-full border-b border-gray-300 py-3 bg-transparent placeholder-gray-300 focus:outline-none focus:border-noir-blue transition-colors`

### 4.3 Product Cards
- **Container**: Minimalist wrapping with no standard CSS boxes.
- **Image Wrapper**: Tall, imposing portraits.
- **Text Area**: Flex layout with `justify-between`. Product name (`font-bold uppercase`), Category (`uppercase text-xs tracking-widest text-gray-400`), Price (`text-noir-blue font-bold text-lg`).

### 4.4 Slide-out Cart / Menus
- **Backdrop**: Stark glassmorphism using heavy blur (`bg-white/30 backdrop-blur-md`).
- **Panel**: Pure white background (`bg-white`), full screen height (`h-screen`) placed to the extreme boundaries (`right-0`), dropping a heavy architectural shadow (`shadow-2xl`).

## 5. Core Rules for Developers
1. **Never use border-radius**: Do not use `rounded-md` or `rounded-lg` on UI elements. Keep corners perfectly square.
2. **Adhere to the Palette**: Rely purely on Black, White, Grey variants, and the Electric Blue accent.
3. **Typography defines Hierarchy**: Keep headings brutally large (`text-5xl` to `text-7xl`), tightly tracked (`tracking-tighter`), and uppercase. Use extremely small (`text-[10px]` or `text-xs`), widely tracked (`tracking-[0.2em]`) text for sub-labels and context.
4. **Minimalistic inputs**: Do not use full borders on data-entry boxes. Use thin bottom-only borders.
