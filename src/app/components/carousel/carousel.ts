import { ChangeDetectionStrategy, Component, ElementRef, input, viewChild } from '@angular/core';
import { Project } from '../../interfaces/project';
import { CardComponent } from '../card/card';

@Component({
  selector: 'app-carousel',
  imports: [CardComponent],
  template: `
    <div class="relative group/carousel">
      <div
        #scrollContainer
        class="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        @for (project of projects(); track project.id) {
          <div class="min-w-[86%] snap-start sm:min-w-[60%] lg:min-w-[31%]">
            <app-card
              [project]="project"
              [badgePrefix]="badgePrefix()"
              [actionLabel]="actionLabel()"
            />
          </div>
        }
      </div>

      <!-- Desktop Scroll Controls -->
      <div class="mt-4 flex items-center justify-end gap-2">
        <button
          type="button"
          (click)="scroll('left')"
          class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/15 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
          aria-label="Scroll left"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          type="button"
          (click)="scroll('right')"
          class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/15 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
          aria-label="Scroll right"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent {
  readonly projects = input.required<Project[]>();
  readonly badgePrefix = input<string>('');
  readonly actionLabel = input<string>('');

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
