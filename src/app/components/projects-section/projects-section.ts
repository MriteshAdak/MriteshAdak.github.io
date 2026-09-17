import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Project } from '../../interfaces/project';
import { ProjectsSectionMeta } from '../../interfaces/section-meta';
import { CarouselComponent } from '../carousel/carousel';
import { SectionComponent } from '../section/section';

@Component({
  selector: 'app-projects-section',
  imports: [SectionComponent, CarouselComponent],
  template: `
    <app-section
      [id]="meta().id"
      [eyebrow]="meta().eyebrow"
      [title]="meta().title"
      [description]="meta().description"
      [actionLabel]="meta().actionLabel"
      [actionHref]="meta().actionHref"
    >
      <app-carousel
        [projects]="projects()"
        [badgePrefix]="meta().cardBadgePrefix"
        [actionLabel]="meta().cardActionLabel"
      />
    </app-section>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsSectionComponent {
  readonly meta = input.required<ProjectsSectionMeta>();
  readonly projects = input.required<Project[]>();
}
