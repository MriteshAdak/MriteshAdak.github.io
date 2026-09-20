import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TimelineSectionMeta } from '../../interfaces/section-meta';
import { TimelineItem } from '../../interfaces/timeline-item';
import { SectionComponent } from '../section/section';
import { TimelineItemComponent } from '../timeline-item/timeline-item';

@Component({
  selector: 'app-timeline-section',
  imports: [SectionComponent, TimelineItemComponent],
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
        @for (item of items(); track item.id) {
          <app-timeline-item
            [item]="item"
            [presentLabel]="meta().presentLabel ?? 'Present'"
          />
        }
      </div>
    </app-section>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineSectionComponent {
  readonly meta = input.required<TimelineSectionMeta>();
  readonly items = input.required<TimelineItem[]>();
}
