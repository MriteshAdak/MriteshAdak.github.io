import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TimelineSectionMeta } from '../../interfaces/section-meta';
import { TimelineItem } from '../../interfaces/timeline-item';
import { CarouselComponent } from '../carousel/carousel';
import { SectionComponent } from '../section/section';
import { TimelineItemComponent } from '../timeline-item/timeline-item';

@Component({
  selector: 'app-timeline-section',
  imports: [SectionComponent, CarouselComponent, TimelineItemComponent],
  template: `
    <app-section [id]="meta().id">
      <app-carousel [itemCount]="items().length">
        @for (item of items(); track item.id) {
          <div class="section-card-slide">
            <app-timeline-item
              [item]="item"
              [presentLabel]="meta().presentLabel ?? 'Present'"
            />
          </div>
        }
      </app-carousel>
    </app-section>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineSectionComponent {
  readonly meta = input.required<TimelineSectionMeta>();
  readonly items = input.required<TimelineItem[]>();
}
