# Favicon Setup - Neobrutalist Style

This document contains the setup instructions for the newly created favicon system.

## Files Created

- ✅ `app/icon.svg` - SVG favicon (scalable, modern browsers)
- ✅ `app/icon.tsx` - Dynamic PNG favicon generator (32x32)
- ✅ `app/icon-192.tsx` - PNG icon for PWA (192x192)
- ✅ `app/icon-512.tsx` - PNG icon for PWA (512x512)
- ✅ `app/apple-icon.tsx` - Apple touch icon (180x180)
- ✅ `app/manifest.json` - Web app manifest for PWA support

## Design

The favicon features a bold "M" letter in Electric Blue (#0D7EFF) with:
- Black borders (6px) for neobrutalist style
- Cream background (#FFFCF2) for standard icons
- Electric Blue background for Apple touch icon (prominence on iOS)
- Hard shadow effects for brutal aesthetic

## Required: Update app/layout.tsx

Add the following properties to the `metadata` object in `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  // ... existing properties ...
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon', sizes: '180x180', type: 'image/png' }],
    other: [
      {
        rel: 'mask-icon',
        url: '/icon.svg',
        color: '#0D7EFF',
      },
    ],
  },
  // ... existing openGraph, robots, etc. ...
  themeColor: '#0D7EFF',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Mattia De Luca',
  },
};
```

## Testing

1. **Local Development**:
   ```bash
   npm run dev
   ```
   - Check browser tab for favicon
   - Inspect with DevTools → Application → Manifest

2. **Production Build**:
   ```bash
   npm run build
   npm start
   ```
   - Verify all icon sizes generate correctly
   - Test PWA installation on mobile

3. **Validation**:
   - Lighthouse PWA audit should pass
   - Safari iOS should show custom icon when added to home screen
   - Android should use 192x192 and 512x512 icons

## Browser Support

- ✅ Modern browsers: SVG favicon
- ✅ Legacy browsers: PNG fallback (32x32)
- ✅ iOS Safari: Apple touch icon (180x180)
- ✅ Android Chrome: PWA icons (192x192, 512x512)
- ✅ PWA: Full manifest support

## Notes

- Icons are generated dynamically using Next.js ImageResponse API
- SVG favicon provides perfect scaling for any resolution
- Theme color (#0D7EFF) matches design system Electric Blue
- Apple status bar style is set to 'default' for best contrast
