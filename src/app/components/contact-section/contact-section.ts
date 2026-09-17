import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ContactItem } from '../../interfaces/contact-item';
import { SectionMeta } from '../../interfaces/section-meta';
import { ContactCardComponent } from '../contact-card/contact-card';
import { SectionComponent } from '../section/section';

@Component({
  selector: 'app-contact-section',
  imports: [SectionComponent, ContactCardComponent],
  template: `
    <app-section
      [id]="meta().id"
      [eyebrow]="meta().eyebrow"
      [title]="meta().title"
      [description]="meta().description"
      [actionLabel]="meta().actionLabel"
      [actionHref]="meta().actionHref"
    >
      <div class="grid gap-4 md:grid-cols-3">
        @for (item of items(); track item.id) {
          <app-contact-card [item]="item" />
        }
      </div>
    </app-section>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactSectionComponent {
  readonly meta = input.required<SectionMeta>();
  readonly items = input.required<ContactItem[]>();
}
