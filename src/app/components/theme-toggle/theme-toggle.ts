import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  imports: [],
  template: `
    <button
      type="button"
      (click)="toggle()"
      class="group relative inline-flex h-9 w-16 shrink-0 cursor-pointer items-center rounded-full border border-[var(--border-surface)] bg-[var(--pill-bg)] p-1 shadow-inner transition hover:border-[var(--accent-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)]"
      [attr.aria-label]="isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
      [attr.title]="isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
    >
      <span class="sr-only">Toggle dark and light theme</span>

      <!-- Sliding switch knob -->
      <span
        class="inline-flex h-7 w-7 transform items-center justify-center rounded-full bg-[var(--accent-gold)] text-black shadow-md transition-transform duration-200"
        [class.translate-x-7]="!isDark()"
        [class.translate-x-0]="isDark()"
      >
        @if (isDark()) {
          <!-- Moon icon -->
          <svg
            class="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
            />
          </svg>
        } @else {
          <!-- Sun icon -->
          <svg
            class="h-4 w-4 text-amber-950"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clip-rule="evenodd"
            />
          </svg>
        }
      </span>

      <!-- Inactive hint icon in track -->
      @if (isDark()) {
        <span class="ml-1 text-slate-400 group-hover:text-[var(--accent-gold)] transition-colors">
          <svg
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </span>
      } @else {
        <span class="absolute left-2.5 text-slate-400 group-hover:text-[var(--accent-gold)] transition-colors">
          <svg
            class="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
            />
          </svg>
        </span>
      }
    </button>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent {
  private readonly themeService = inject(ThemeService);
  protected readonly isDark = this.themeService.isDark;

  protected toggle(): void {
    this.themeService.toggleTheme();
  }
}
