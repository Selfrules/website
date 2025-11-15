'use client';

import Script from 'next/script';
import { useEffect } from 'react';

/**
 * Umami Analytics Script Component
 *
 * Loads the Umami tracker script for automatic page view tracking.
 * Also exposes the umami object to window for custom event tracking.
 *
 * @component
 * @category Analytics
 *
 * @see https://umami.is/docs/tracker-functions
 */
export function UmamiScript() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const hostUrl = process.env.NEXT_PUBLIC_UMAMI_HOST_URL || 'https://cloud.umami.is';

  // Don't load in development unless explicitly enabled
  const isEnabled = process.env.NEXT_PUBLIC_UMAMI_ENABLED === 'true' ||
                    process.env.NODE_ENV === 'production';

  useEffect(() => {
    if (!isEnabled || !websiteId) {
      console.warn('⚠️ Umami Analytics: Disabled or not configured');
      return;
    }

    console.log('✅ Umami Analytics: Initialized');
  }, [isEnabled, websiteId]);

  if (!isEnabled || !websiteId) {
    return null;
  }

  return (
    <Script
      src={`${hostUrl}/script.js`}
      data-website-id={websiteId}
      data-host-url={hostUrl}
      data-auto-track="true"
      data-do-not-track="true" // Respect DNT header
      strategy="afterInteractive"
      defer
    />
  );
}
