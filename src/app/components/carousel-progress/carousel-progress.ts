import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

export interface CarouselSectionMeta {
  readonly id: string;
  readonly label: string;
}

@Component({
  selector: 'app-carousel-progress',
  imports: [],
  template: `
    <aside
      class="fixed left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3 select-none"
      aria-label="Carousel section progress"
    >
      <!-- Prev section arrow -->
      <button
        type="button"
        (click)="prev.emit()"
        [disabled]="isFirst()"
        class="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border-surface)] bg-[var(--pill-btn-bg)] text-[var(--text-muted)] shadow-lg backdrop-blur transition hover:border-[var(--accent-gold)] hover:bg-[var(--nav-active-bg)] hover:text-[var(--text-heading)] disabled:opacity-20 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)]"
        aria-label="Previous section"
        title="Previous section"
      >
        <svg
          class="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2.5"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
          />
        </svg>
      </button>

      <!-- Vertical progress track and step markers -->
      <div
        class="relative flex flex-col items-center py-2 px-1.5 rounded-full border border-[var(--border-surface)] bg-[var(--pill-bg)] shadow-2xl backdrop-blur-md"
      >
        <!-- Background track line -->
        <div
          class="absolute top-4 bottom-4 w-0.5 bg-[var(--border-surface)] rounded-full"
        ></div>

        <!-- Active filled progress line -->
        <div
          class="absolute top-4 w-0.5 bg-[var(--accent-gold)] rounded-full transition-all duration-300"
          [style.height]="progressHeightStyle()"
        ></div>

        <!-- Step node buttons -->
        <div class="relative flex flex-col gap-6 z-10">
          @for (sec of sections(); track sec.id; let idx = $index) {
            <button
              type="button"
              (click)="sectionSelect.emit(sec.id)"
              class="group relative flex items-center justify-center focus:outline-none"
              [attr.aria-current]="isActive(sec.id) ? 'step' : null"
              [attr.aria-label]="sec.label"
            >
              <!-- Indicator Dot -->
              <span
                class="h-3 w-3 rounded-full transition-all duration-300"
                [class.bg-[var(--accent-gold)]]="isActive(sec.id)"
                [class.scale-125]="isActive(sec.id)"
                [class.ring-4]="isActive(sec.id)"
                [class.ring-[var(--accent-gold-border)]]="isActive(sec.id)"
                [class.bg-[var(--text-muted)]/50]="!isActive(sec.id) && idx <= activeIndex()"
                [class.bg-[var(--text-muted)]/20]="idx > activeIndex()"
                [class.group-hover:bg-[var(--accent-gold)]]="!isActive(sec.id)"
              ></span>

              <!-- Hover Tooltip Label -->
              <span
                class="pointer-events-none absolute left-7 whitespace-nowrap rounded-md border border-[var(--border-surface)] bg-[var(--pill-btn-bg)] px-2.5 py-1 text-xs font-medium text-[var(--text-heading)] shadow-xl backdrop-blur-md opacity-0 transition-opacity duration-200 group-hover:opacity-100 hidden sm:block"
              >
                {{ sec.label }}
              </span>
            </button>
          }
        </div>
      </div>

      <!-- Next section arrow -->
      <button
        type="button"
        (click)="next.emit()"
        [disabled]="isLast()"
        class="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border-surface)] bg-[var(--pill-btn-bg)] text-[var(--text-muted)] shadow-lg backdrop-blur transition hover:border-[var(--accent-gold)] hover:bg-[var(--nav-active-bg)] hover:text-[var(--text-heading)] disabled:opacity-20 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)]"
        aria-label="Next section"
        title="Next section"
      >
        <svg
          class="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2.5"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
    </aside>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselProgressComponent {
  readonly sections = input.required<readonly CarouselSectionMeta[]>();
  readonly activeSectionId = input.required<string>();

  readonly sectionSelect = output<string>();
  readonly next = output<void>();
  readonly prev = output<void>();

  protected readonly activeIndex = computed(() => {
    const list = this.sections();
    const target = this.activeSectionId();
    const idx = list.findIndex(
      (s) =>
        s.id === target ||
        (target === 'home' && s.id === 'about') ||
        (target === 'about' && s.id === 'home')
    );
    return idx >= 0 ? idx : 0;
  });

  protected readonly isFirst = computed(() => this.activeIndex() <= 0);
  protected readonly isLast = computed(
    () => this.activeIndex() >= this.sections().length - 1
  );

  protected readonly progressHeightStyle = computed(() => {
    const total = this.sections().length;
    if (total <= 1) return '100%';
    const pct = (this.activeIndex() / (total - 1)) * 100;
    return `${Math.min(100, Math.max(0, pct))}%`;
  });

  protected isActive(secId: string): boolean {
    const target = this.activeSectionId();
    return (
      secId === target ||
      (target === 'home' && secId === 'about') ||
      (target === 'about' && secId === 'home')
    );
  }
}
