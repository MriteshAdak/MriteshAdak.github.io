import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TimelineItem } from '../../interfaces/timeline-item';

@Component({
  selector: 'app-timeline-item',
  imports: [],
  host: {
    class: 'block',
  },
  template: `
    <article
      class="glass-surface-light glass-surface-interactive grid gap-4 p-5 sm:p-6"
      [class.sm:grid-cols-[0.85fr_1.15fr]]="!!item().description"
    >
      <div>
        <p class="eyebrow">{{ displayPeriod() }}</p>
        <h3 class="mt-2 text-xl font-semibold text-white">{{ item().title }}</h3>
        <p class="body-text mt-1 text-sm">{{ item().subtitle }}</p>
      </div>

      @if (item().description) {
        <p class="body-text text-sm">{{ item().description }}</p>
      }
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
