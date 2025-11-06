'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useAnalytics } from '@/lib/hooks/useAnalytics';

/**
 * Analytics Provider
 * Automatically tracks page views on route changes
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const analytics = useAnalytics();

  useEffect(() => {
    // Track page view on mount and route change
    analytics.trackPageView();
  }, [pathname, searchParams, analytics]);

  // Scroll depth tracking
  useEffect(() => {
    let maxScrollDepth = 0;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = Math.round(
        ((scrollTop + windowHeight) / documentHeight) * 100
      );

      if (scrollPercentage > maxScrollDepth) {
        maxScrollDepth = scrollPercentage;

        // Debounce scroll depth tracking
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          // Track at 25%, 50%, 75%, 100% milestones
          if (
            maxScrollDepth >= 25 && maxScrollDepth < 26 ||
            maxScrollDepth >= 50 && maxScrollDepth < 51 ||
            maxScrollDepth >= 75 && maxScrollDepth < 76 ||
            maxScrollDepth >= 100
          ) {
            analytics.trackScrollDepth(maxScrollDepth, pathname);
          }
        }, 1000);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [pathname, analytics]);

  return <>{children}</>;
}
