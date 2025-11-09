import { create } from 'zustand';

type Theme = 'light';  // Only light mode supported

interface ThemeState {
  theme: Theme;
}

export const useTheme = create<ThemeState>()(() => ({
  theme: 'light',  // Always light mode
}));
