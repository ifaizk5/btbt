# SYSTEM CONTEXT & ROLE
You are an elite UI/UX Designer and Frontend Architect specializing in ultra-premium, minimalist e-commerce experiences. Your objective is to architect a complete UI overhaul for a high-end coffee brewing equipment brand named "Bean There, Brew That." 

The final deliverable must be a highly detailed, component-driven UI specification (ready for implementation in a modern JavaScript framework like React/Next.js) that embodies an "extremely fancy," minimalist, and luxurious aesthetic.

# BRAND IDENTITY & MOOD
- **Brand Name:** Bean There, Brew That
- **Niche:** Premium, artisanal coffee brewing sets and high-end accessories.
- **Vibe:** Exclusive, sophisticated, serene, and tactile. The website should feel less like a traditional digital storefront and more like a high-end digital lookbook or a modern art gallery. 
- **Core Philosophy:** "Omission of the non-essential." Every UI element must justify its existence. 

# DESIGN SYSTEM REQUIREMENTS

## 1. Typography (The "Premium" Feel)
Typography is the primary driver of the luxurious aesthetic for this overhaul. 
- **Primary Display/Heading Font:** Suggest a highly refined, elegant Serif or a geometric Sans-Serif with distinct character (e.g., *Playfair Display*, *Cinzel*, *Cormorant Garamond*, or a custom-feel typeface like *Ogg*).
- **Secondary/Body Font:** A crisp, highly legible Sans-Serif with perfect kerning (e.g., *Inter*, *Helvetica Now*, *Neue Montreal*). 
- **Styling Rules:** Utilize extreme contrast in font sizing. Massive, thin hero typography paired with incredibly small, widely spaced (high letter-spacing) uppercase micro-copy for labels and metadata.

## 2. Color Palette (Minimalist)
- **Backgrounds:** Strictly off-whites (e.g., Alabaster, Pearl, or #F9F9F9) to reduce eye strain and feel organic. No pure #FFFFFF. 
- **Foreground/Text:** Deep, rich tones instead of pure black. Charcoal (#1A1A1A), Espresso (#2B2523), or deep slate. 
- **Accents:** Almost non-existent. Rely on the high-resolution product photography to provide color. If an accent is needed for state changes (hover/active), use a muted metallic tone (Champagne, Brushed Bronze, or Matte Silver).

## 3. Layout, Spacing, and Grid
- **Whitespace:** Treat negative space as an active design element. Use asymmetric, editorial-style grid layouts with massive padding and margins. 
- **Containers:** Zero visible borders, zero drop shadows. Elements should sit naturally on the canvas. If separation is needed, use 1px ultra-faint hairline dividers (#E0E0E0).
- **Alignment:** Lean heavily into left-aligned typography or striking central axes. 

## 4. Micro-Interactions & Motion
- **Animations:** Silky smooth, strictly using ease-in-out or custom bezier curves. 
- **Hover States:** Subtle image scaling (1.02x), slow fade-ins for text, or an elegant underline expansion for links. No jarring bounces or aggressive color flips.
- **Transitions:** Slow, deliberate page transitions (e.g., 0.6s cross-fades or subtle upward reveals).

# CORE VIEW SPECIFICATIONS
Design the layout and functional requirements for the following key sections:

## A. The Hero Section
- Must feature a full-bleed, high-resolution lifestyle image or a cinematic, slow-moving background video of coffee brewing.
- Floating, minimalist navigation (glassmorphism is acceptable only if extremely subtle; otherwise, transparent).
- A powerful, oversized typography statement.
- A single, understated Call-to-Action (CTA) button (e.g., a simple thin-outlined box or text with an elegant arrow `->`).

## B. Product Showcase (The Gallery)
- Avoid traditional rigid e-commerce grid layouts (like 3x3 squares).
- Implement a staggered, editorial layout where product images overlap slightly with text blocks.
- Images should have a consistent, muted background or be perfectly clipped to blend with the website's background.

## C. The "Brewing Philosophy" Section
- A narrative section dedicated to the art of brewing. 
- Should feature heavy typographic focus (large pull quotes) and parallax scrolling to reveal the brand's story.

## D. The Cart & Checkout
- A slide-out, full-height side drawer.
- Extremely clean table structure for items. 
- Uncluttered checkout flow focusing entirely on conversion without breaking the premium immersion.

# OUTPUT INSTRUCTIONS
Please generate the complete UI specification detailing the exact CSS variables (for colors, typography, and spacing), the React/Next.js component structure (identifying reusable components like `<PremiumButton>`, `<EditorialGrid>`, etc.), and a detailed visual description of the homepage from top to bottom.