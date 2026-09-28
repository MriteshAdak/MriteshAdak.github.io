import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Project } from '../../interfaces/project';
import { ProjectsSectionMeta } from '../../interfaces/section-meta';
import { CardComponent } from '../card/card';
import { CarouselComponent } from '../carousel/carousel';
import { SectionComponent } from '../section/section';

@Component({
  selector: 'app-projects-section',
  imports: [SectionComponent, CarouselComponent, CardComponent],
  template: `
    <app-section [id]="meta().id">
      <app-carousel [itemCount]="projects().length">
        @for (project of projects(); track project.id) {
          <div class="section-card-slide">
            <app-card
              [project]="project"
              [actionLabel]="meta().cardActionLabel"
            />
          </div>
        }
      </app-carousel>
    </app-section>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsSectionComponent {
  readonly meta = input.required<ProjectsSectionMeta>();
  readonly projects = input.required<Project[]>();
}
