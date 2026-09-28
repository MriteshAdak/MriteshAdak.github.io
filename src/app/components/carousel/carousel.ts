import { ChangeDetectionStrategy, Component, ElementRef, computed, input, viewChild } from '@angular/core';

@Component({
  selector: 'app-carousel',
  imports: [],
  template: `
    <div class="relative group/carousel w-full">
      <div
        #scrollContainer
        [class]="containerClasses()"
      >
        <ng-content></ng-content>
      </div>

      @if (showControls()) {
        <!-- Desktop Scroll Controls (reactive: only when more items than visibleCount) -->
        <div class="mt-4 flex items-center justify-end gap-2 pr-2">
          <button
            type="button"
            (click)="scroll('left')"
            class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-surface)] bg-[var(--bg-surface)] text-[var(--text-muted)] transition hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-heading)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)]"
            aria-label="Scroll left"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            type="button"
            (click)="scroll('right')"
            class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-surface)] bg-[var(--bg-surface)] text-[var(--text-muted)] transition hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-heading)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)]"
            aria-label="Scroll right"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      }
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent {
  readonly itemCount = input<number>(0);
  readonly visibleCount = input<number>(3);
  readonly gapClass = input<string>('gap-6');

  protected readonly showControls = computed(() => this.itemCount() > this.visibleCount());
  protected readonly containerClasses = computed(
    () =>
      `flex items-stretch snap-x snap-mandatory overflow-x-auto scroll-smooth py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${this.gapClass()}`
  );

  private readonly scrollContainer = viewChild<ElementRef<HTMLDivElement>>('scrollContainer');

  scroll(direction: 'left' | 'right'): void {
    const container = this.scrollContainer()?.nativeElement;
    if (!container) return;

    const offset = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === 'left' ? -offset : offset,
      behavior: 'smooth',
    });
  }
}
