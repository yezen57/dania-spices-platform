# Fonts Directory

This directory contains the custom fonts for the Dania website.

## Required Fonts

### Arabic Font: A Lamia
- **Files needed:**
  - `A-Lamia.woff2`
  - `A-Lamia.woff`
  - `A-Lamia.ttf`
  - `A-Lamia-Bold.woff2`
  - `A-Lamia-Bold.woff`
  - `A-Lamia-Bold.ttf`

### English Font: Abdoullah Ashger EL-kharef
- **Files needed:**
  - `Abdoullah-Ashger-EL-kharef.woff2`
  - `Abdoullah-Ashger-EL-kharef.woff`
  - `Abdoullah-Ashger-EL-kharef.ttf`
  - `Abdoullah-Ashger-EL-kharef-Bold.woff2`
  - `Abdoullah-Ashger-EL-kharef-Bold.woff`
  - `Abdoullah-Ashger-EL-kharef-Bold.ttf`

## How to Add Fonts

1. Download the font files from their respective sources
2. Place the font files in this directory (`public/fonts/`)
3. Ensure the file names match exactly as listed above
4. The CSS is already configured to use these fonts

## Font Usage

- **Arabic text:** Uses 'A Lamia' font
- **English text:** Uses 'Abdoullah Ashger EL-kharef' font
- **Mixed content:** Uses both fonts with fallback

## CSS Classes

- `.arabic-text` or `[dir="rtl"]` - For Arabic text
- `.english-text` or `.ltr` - For English text
- `.mixed-content` - For mixed Arabic/English content

## Tailwind Classes

- `font-arabic` - Arabic font family
- `font-english` - English font family
- `font-mixed` - Mixed font family 