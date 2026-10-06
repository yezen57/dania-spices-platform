<p align="center">
  <img src="img/DANIA%20LOGO%20PNG-01.png" alt="Dania Spices Logo" width="240" />
</p>

<h1 align="center">Dania Spices</h1>

<p align="center">
  <strong>A modern, responsive e-commerce showcase and content management web platform built for Dania Spices, a premium purveyor of natural spices, organic dates, raw honey, nuts, and natural oils based in Djibouti.</strong>
</p>

<p align="center">
  Multilingual (Arabic / English / French) &bull; Client-Side Administration &bull; RTL & LTR Support
</p>

---

## Overview

Dania Spices is engineered as a client-side single-page application (SPA) designed to combine high-performance product browsing with rich branding. It includes animated landing sections, category-filtered product listings, brand heritage storytelling, an interactive photo gallery, a contact inquiry system with Google Maps integration, and an administrative control panel.

---

## Features

### Storefront Experience
- Trilingual Internationalization (i18n): Native support for Arabic, English, and French with dynamic right-to-left (RTL) and left-to-right (LTR) layout switching.
- Dark and Light Theme Modes: System-aware and persistent theme toggling using CSS variables and HTML class state.
- Interactive Hero & Advertisement Carousel: Auto-rotating promotional slider with pause-on-hover and playback controls.
- Product Catalog: Categorized browsing across spices, dates, honey, nuts, pantry staples, and natural oils with keyword search and view mode switching (grid and list views).
- Brand Story & Mission: Dedicated heritage page featuring brand values, milestones, and animated statistics counters.
- Media Gallery: Visual gallery with tabbed category filtering for products and store events.
- Customer Inquiries: Contact form validating inquiries and storing messages locally, coupled with an interactive Google Maps store location embed.

### Administrative Control Panel (/admin)
- Metric Summaries: Real-time dashboard KPI counters tracking total products, active advertisements, gallery entries, and customer messages.
- Advertisement Management: Add, preview, and remove promotional banner slides.
- Gallery Management: Upload and categorize visual assets with real-time preview.
- Product Management: Client-side catalog editing with image preview and category assignment.
- Message Inbox: Direct review of contact form submissions received from customer inquiries.

### Build and SEO Utilities
- Automated LLM / SEO Indexing: Pre-build script that scans React Helmet metadata across routes to generate a structured `llms.txt` file for modern search engines and AI crawlers.

---

## Technology Stack

### Core Frameworks
- React 18: Core UI component architecture.
- Vite 4: Fast development server and optimized rollup production bundling.
- React Router DOM v6: Client-side route management.

### Styling and UI Components
- Tailwind CSS v3: Utility-first CSS styling system.
- Radix UI Primitives: Accessible UI components including Dialogs, Tabs, Toasts, Labels, and Sliders.
- Framer Motion: Hardware-accelerated transitions and interactive micro-animations.
- Lucide React: Vector iconography used within the user interface.
- Class Variance Authority (CVA) & clsx & tailwind-merge: Composable styling utilities.

### Data Storage & Architecture
- LocalStorage Persistence: Client-side persistent key-value store for administrative items, saved messages, active theme, and language preferences.
- React Context API: Global application state management for internationalization and color themes.

---

## Project Structure

```text
code/
|-- public/
|   |-- fonts/              # Custom typography assets
|   |-- .htaccess           # Apache rewrite rules for SPA routing
|-- src/
|   |-- components/
|   |   |-- ui/             # Radix UI and shadcn component primitives
|   |   |-- AdvertisementSlider.jsx
|   |   |-- Footer.jsx
|   |   |-- Header.jsx
|   |-- contexts/
|   |   |-- LanguageContext.jsx  # i18n dictionary and RTL/LTR state
|   |   |-- ThemeContext.jsx     # Light/Dark mode state provider
|   |-- lib/
|   |   |-- utils.js        # Tailwind merge helper
|   |-- pages/
|   |   |-- Admin/          # Administrative control sub-views
|   |   |   |-- AdminStats.jsx
|   |   |   |-- AdvertisementManagement.jsx
|   |   |   |-- ContactMessages.jsx
|   |   |   |-- GalleryManagement.jsx
|   |   |   |-- ProductForm.jsx
|   |   |   |-- ProductManagement.jsx
|   |   |-- About.jsx
|   |   |-- Admin.jsx
|   |   |-- Contact.jsx
|   |   |-- Gallery.jsx
|   |   |-- Home.jsx
|   |   |-- Products.jsx
|   |-- App.jsx             # Top-level route configuration
|   |-- index.css           # Global design tokens and font declarations
|   |-- main.jsx            # Application entry point
|-- tools/
|   |-- generate-llms.js    # Pre-build route metadata extractor
|-- index.html              # HTML template
|-- package.json            # Project manifest and dependencies
|-- tailwind.config.js      # Design system configuration
|-- vite.config.js          # Vite build and plugin configuration
```

---

## Getting Started

### Prerequisites
- Node.js: v18.0.0 or v20.19.1 (recommended via `.nvmrc`)
- npm: v9.0.0 or newer (or yarn / pnpm)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/dania-spices.git
   cd dania-spices/code
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory (refer to the Configuration section below).

4. Start the development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

---

## Available Scripts

- `npm run dev`: Launches the local Vite development server with hot module replacement (HMR).
- `npm run build`: Executes the `generate-llms.js` metadata extractor and compiles the optimized production bundle.
- `npm run preview`: Starts a local web server to preview the production build output.

---

## Configuration

### Environment Variables

Create a `.env` file in the project root to configure external API keys:

```bash
# Google Maps Embed API Key for the Contact page
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### Web Server Deployment

For Apache HTTP Server deployments, the included `public/.htaccess` file configures rewrite rules ensuring that all deep links (e.g., `/products`, `/admin`) are redirected to `index.html` for client-side routing.

---

## Internationalization (i18n)

Translations are handled directly through `src/contexts/LanguageContext.jsx`. The translation dictionary currently supports:
- Arabic (`ar`) - Sets text direction to RTL and applies the Arabic font family.
- English (`en`) - Sets text direction to LTR and applies the English font family.
- French (`fr`) - Sets text direction to LTR and applies the Latin font family.

Language selection is preserved across browser sessions via `localStorage` key `daniya-language`.

---

## Limitations and Future Roadmap

- Backend API Integration: Currently, administrative entries and inquiries rely on browser `localStorage`. A future release will connect this frontend to a RESTful API or Headless CMS (e.g., Strapi, Node/Express, or Supabase).
- Admin Authentication: The `/admin` dashboard currently runs without an authentication barrier. Implementing JWT or OAuth route protection is planned.
- Cloud Image Uploads: Integrating cloud storage (e.g., Cloudinary or AWS S3) to replace Base64 storage in local browser storage.
- Shopping Cart & Checkout: Adding an e-commerce checkout flow supporting payment gateways.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
