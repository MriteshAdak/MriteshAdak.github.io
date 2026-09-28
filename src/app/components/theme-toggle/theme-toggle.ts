import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  imports: [],
  template: `
    <button
      type="button"
      class="group relative inline-flex h-9 w-16 shrink-0 cursor-pointer items-center rounded-full border border-white/15 bg-white/10 p-1 shadow-inner transition hover:border-amber-400/40 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
      aria-label="Toggle dark/light mode"
      title="Theme toggle (preview)"
    >
      <span class="sr-only">Toggle dark and light theme</span>
      <!-- Switch knob -->
      <span
        class="inline-flex h-7 w-7 transform items-center justify-center rounded-full bg-amber-400 text-black shadow-md transition-transform duration-200"
      >
        <!-- Dark / Moon icon (since dark mode is current default) -->
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
      <span class="ml-1 text-slate-400 group-hover:text-amber-300 transition-colors">
        <!-- Sun icon hint on the right -->
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
    </button>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent {}
