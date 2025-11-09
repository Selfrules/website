'use client';

import React, { useEffect } from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Always set light mode on mount
    const root = window.document.documentElement;
    root.classList.remove('dark');
    root.classList.add('light');

    // Also remove any stored theme preference from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('theme-storage');
    }
  }, []);

  return <>{children}</>;
}
