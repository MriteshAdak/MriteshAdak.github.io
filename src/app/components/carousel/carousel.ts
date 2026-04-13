import { Component, input } from '@angular/core';
import { Card } from '../card/card';
import { Project } from '../../interfaces/project';

@Component({
  selector: 'app-carousel',
  imports: [Card],
  template: ` <div>
    @for (project of projects(); track project.id) {
      <app-card [project]="project"></app-card>
    }
  </div> `,
  styles: ``,
})
export class Carousel {
  projects = input.required<Project[]>();
}
