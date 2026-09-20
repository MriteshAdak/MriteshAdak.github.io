import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Experience } from '../../interfaces/experience';

@Component({
  selector: 'app-experience-item',
  imports: [],
  host: {
    class: 'block',
  },
  template: `
    <article class="glass-surface-light glass-surface-interactive grid gap-4 p-5 sm:grid-cols-[0.85fr_1.15fr] sm:p-6">
      <div>
        <p class="eyebrow">{{ displayPeriod() }}</p>
        <h3 class="mt-2 text-xl font-semibold text-white">{{ experience().role }}</h3>
        <div class="mt-1 flex items-baseline justify-between gap-3">
          <p class="body-text text-sm">{{ experience().company }}</p>
          @if (experience().location) {
            <span class="inline-flex shrink-0 items-center gap-1 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-0.5 text-xs font-medium text-cyan-200">
              <svg class="h-3 w-3 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ experience().location }}
            </span>
          }
        </div>
      </div>

      <p class="body-text text-sm">{{ experience().summary }}</p>
    </article>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceItemComponent {
  readonly experience = input.required<Experience>();
  readonly presentLabel = input<string>('Present');

  protected readonly displayPeriod = computed(() => {
    const exp = this.experience();
    if (exp.period) {
      return exp.period;
    }
    const end = exp.isCurrent || !exp.endDate ? this.presentLabel() : exp.endDate;
    return exp.startDate ? `${exp.startDate} — ${end}` : '';
  });
}
