import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Experience } from '../../interfaces/experience';

@Component({
  selector: 'app-experience-item',
  imports: [],
  template: `
    <article class="glass-surface-light glass-surface-interactive grid gap-4 p-5 sm:grid-cols-[0.85fr_1.15fr] sm:p-6">
      <div>
        <p class="eyebrow">{{ displayPeriod() }}</p>
        <h3 class="mt-2 text-xl font-semibold text-white">{{ experience().role }}</h3>
        <p class="body-text mt-1 text-sm">{{ experience().company }}</p>
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
