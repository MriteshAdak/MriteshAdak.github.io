import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  private readonly themeSignal = signal<Theme>('dark');
  readonly currentTheme = this.themeSignal.asReadonly();
  readonly isDark = computed(() => this.themeSignal() === 'dark');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      if (savedTheme === 'dark' || savedTheme === 'light') {
        this.setTheme(savedTheme);
      } else {
        // Default to dark mode
        this.setTheme('dark');
      }
    }
  }

  toggleTheme(): void {
    const nextTheme: Theme = this.isDark() ? 'light' : 'dark';
    this.setTheme(nextTheme);
  }

  setTheme(theme: Theme): void {
    this.themeSignal.set(theme);

    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem('theme', theme);
      } catch {
        // Ignore localStorage restrictions
      }

      const root = this.document.documentElement;
      root.classList.remove('dark', 'light');
      root.classList.add(theme);
      root.setAttribute('data-theme', theme);

      const metaTheme = this.document.querySelector('meta[name="theme-color"]');
      if (metaTheme) {
        metaTheme.setAttribute('content', theme === 'dark' ? '#000000' : '#ffffff');
      }
    }
  }
}
