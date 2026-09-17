import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Experience } from '../../interfaces/experience';
import { ExperiencesSectionMeta } from '../../interfaces/section-meta';
import { ExperienceItemComponent } from '../experience-item/experience-item';
import { SectionComponent } from '../section/section';

@Component({
  selector: 'app-experience-section',
  imports: [SectionComponent, ExperienceItemComponent],
  template: `
    <app-section
      [id]="meta().id"
      [eyebrow]="meta().eyebrow"
      [title]="meta().title"
      [description]="meta().description"
      [actionLabel]="meta().actionLabel"
      [actionHref]="meta().actionHref"
    >
      <div class="flex flex-col gap-4">
        @for (experience of experiences(); track experience.id) {
          <app-experience-item
            [experience]="experience"
            [presentLabel]="meta().presentLabel"
          />
        }
      </div>
    </app-section>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceSectionComponent {
  readonly meta = input.required<ExperiencesSectionMeta>();
  readonly experiences = input.required<Experience[]>();
}
