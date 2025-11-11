# PromotionX Design Guidelines

## Design Approach
**Reference-Based + Futuristic Tech Aesthetic**
- Fusion of Instagram's elegance + Stripe's smoothness + Telegram's tech feel
- Modern startup vibe with 3D futuristic elements
- Dark neon color scheme with blue/purple/teal gradients

## Core Visual Identity

### Typography
- Modern, clean sans-serif similar to Instagram/contemporary startups
- Hero heading: Bold, large-scale typography (4xl-6xl on desktop)
- Subheadings: Medium weight, slightly smaller scale
- Body text: Regular weight, optimized readability on dark backgrounds
- Consistent hierarchy across all pages

### Color Palette
- Base: Dark theme (deep blacks and dark grays)
- Accent: Neon blue, purple, and teal gradients
- Glowing effects: Subtle neon halos around key elements
- Text: White/light gray on dark backgrounds
- CTAs: Bright gradient buttons with glow effects

### Layout System
- Spacing: Consistent use of Tailwind units: 4, 8, 12, 16, 24 for padding/margins
- Container max-width: 1280px (max-w-7xl) for main content
- Grid layouts: Responsive (1 column mobile, 2-3 columns tablet/desktop)

## Page-Specific Designs

### 1. Home Page (Landing)
**Hero Section:**
- Full viewport height with 3D animated background (Three.js particles/geometric shapes)
- Centered content with dramatic typography
- Hero heading: "Grow Faster on Telegram — With PromotionX 🚀"
- Subheading: "Smart automation, real reach, and seamless upgrades."
- Two prominent CTAs side-by-side:
  - "Launch Telegram Bot" (primary gradient button)
  - "Join Community" (secondary outline button)
- Auto-typing text effect cycling through: "Promote. Grow. Automate."

**Features Section:**
- 3 animated cards in grid layout (responsive to single column on mobile)
- Each card: Icon at top, title, short description
- Features: "Instant Channel Promotions", "Auto Message Scheduler", "Smart Audience Tools"
- Hover effects: Lift animation + glow border
- Scroll-triggered entrance animations

**How It Works:**
- Step-by-step process visualization (numbered 1-2-3-4)
- Use illustrated icons or simple graphics
- Horizontal layout on desktop, vertical stack on mobile
- Connecting lines/arrows between steps with animation

**Testimonials:**
- Horizontal slider/carousel
- Cards with profile pictures, quote, name, and role
- Auto-rotate with manual navigation controls
- 3 testimonials visible on desktop, 1 on mobile

**Contact/Footer Area:**
- Email and Telegram link prominently displayed
- Social media icons: Telegram, Instagram, YouTube
- Footer links and copyright info

### 2. Premium Plans Page
**Layout:**
- 3 pricing cards side-by-side (stack on mobile)
- Plans: 1 Day, 1 Week, 1 Month
- Each card: Plan name, price (large), features list, "Pay Now" button
- Highlight most popular plan (larger scale or glowing border)
- Gradient card backgrounds with neon accents
- Hover effect: Scale up + enhanced glow

### 3. Payment Status Page
**Simple centered layout:**
- Large success/failure icon (checkmark or X)
- Transaction details in clean card format
- "Go to Telegram Bot" CTA button at bottom
- Minimal distractions, focus on status

### 4. Admin Dashboard
**Dark Modern UI (Stripe/Discord style):**
- Left sidebar navigation (collapsible on mobile)
- Top header with admin info and logout
- Main content area with white/gray cards on dark background
- Payment table: Clean rows with alternating subtle backgrounds
- Columns: Date, Amount, Plan, Status, UTR, User Email/ID
- Export button (CSV) at top right
- Revenue graph: Line or bar chart with gradient fills
- Minimalist, data-focused design

## Global Components

### Floating Telegram Widget
- Fixed position bottom-right corner
- Circular button with Telegram icon
- Pulsing glow animation
- Z-index above all content

### Navigation (If applicable)
- Minimal top navbar with logo left, links right
- Transparent background with blur effect on scroll
- Mobile: Hamburger menu

### FAQ Accordion
- Animated expand/collapse
- Plus/minus icon indicators
- Smooth height transitions
- Clean dividers between items

### Buttons
- Primary: Gradient background (blue to purple/teal)
- Secondary: Outline with neon glow
- Hover: Brightness increase + scale
- All buttons: Rounded corners (rounded-lg or rounded-xl)

## Animation Strategy
- 3D background: Constant subtle motion (Three.js)
- Scroll-based: Fade-in + slide-up for sections (Framer Motion)
- Hover effects: Scale, glow, color shifts
- Transitions: Smooth 300-400ms easing
- Keep animations performant despite 3D elements

## Images
- No large hero images specified (3D background replaces this)
- Testimonial profile pictures: Circular, small (48-64px)
- Feature cards: Optional icon illustrations
- Use Telegram logo/branding where appropriate

## Responsive Breakpoints
- Mobile: < 768px (stack all content)
- Tablet: 768px - 1024px (2-column grids)
- Desktop: > 1024px (full multi-column layouts)

## Performance Considerations
- Optimize Three.js scenes for mobile
- Lazy load animations outside viewport
- Minimize bundle size with dynamic imports
- Ensure fast initial page load despite 3D elements