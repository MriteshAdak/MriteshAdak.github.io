import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TimelineItem } from '../../interfaces/timeline-item';

@Component({
  selector: 'app-timeline-item',
  imports: [],
  host: {
    class: 'flex flex-col flex-1 h-full min-h-0',
  },
  template: `
    <article class="glass-surface-light glass-surface-interactive group flex flex-col flex-1 h-full min-h-0 justify-between overflow-hidden p-6 sm:p-8">
      <div class="flex flex-col flex-1 min-h-0 overflow-hidden">
        <div class="flex items-center justify-between gap-3 shrink-0">
          <p class="eyebrow">{{ displayPeriod() }}</p>
          @if (item().location) {
            <span class="inline-flex shrink-0 items-center gap-1 rounded-full border border-[var(--accent-gold-border)] bg-[var(--accent-gold-subtle)] px-2.5 py-0.5 text-xs font-medium text-[var(--accent-gold-text)]">
              <svg class="h-3 w-3 text-[var(--accent-gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ item().location }}
            </span>
          }
        </div>

        <div class="mt-4 shrink-0">
          <h3 class="text-xl sm:text-2xl font-semibold text-[var(--text-heading)] transition-colors duration-300">{{ item().title }}</h3>
          <p class="mt-1 text-sm sm:text-base font-medium text-[var(--accent-gold)]">{{ item().subtitle }}</p>
        </div>

        @if (item().description) {
          <div class="mt-4 flex-1 min-h-0 overflow-y-auto pr-1 [scrollbar-width:thin]">
            <p class="body-text whitespace-pre-line text-sm sm:text-base leading-relaxed">{{ item().description }}</p>
          </div>
        }
      </div>
    </article>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineItemComponent {
  readonly item = input.required<TimelineItem>();
  readonly presentLabel = input<string>('Present');

  protected readonly displayPeriod = computed(() => {
    const entry = this.item();
    if (entry.period) {
      return entry.period;
    }
    const end = entry.isCurrent || !entry.endDate ? this.presentLabel() : entry.endDate;
    return entry.startDate ? `${entry.startDate} — ${end}` : '';
  });
}
