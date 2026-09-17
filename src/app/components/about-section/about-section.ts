import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AboutSectionMeta } from '../../interfaces/section-meta';
import { UserProfile } from '../../interfaces/user-profile';
import { SectionComponent } from '../section/section';
import { TagsComponent } from '../tags/tags';

@Component({
  selector: 'app-about-section',
  imports: [SectionComponent, TagsComponent],
  template: `
    @if (profile(); as userProfile) {
      <app-section
        [id]="meta().id"
        [eyebrow]="meta().eyebrow"
        [title]="userProfile.title || meta().title"
        [description]="userProfile.summary"
        [actionLabel]="meta().actionLabel"
        [actionHref]="meta().actionHref"
      >
        <div class="grid gap-4">
          <div class="glass-surface-light glass-surface-interactive p-6">
            @if (meta().cardEyebrow) {
              <p class="eyebrow">{{ meta().cardEyebrow }}</p>
            }
            <p class="body-text mt-4 mb-4">
              {{ userProfile.headline }}
            </p>
            @if (highlights().length > 0) {
              <app-tags class="mt-5" [tags]="highlights()" />
            }
          </div>
        </div>
      </app-section>
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutSectionComponent {
  readonly meta = input.required<AboutSectionMeta>();
  readonly profile = input<UserProfile | null>(null);
  readonly highlights = input<string[]>([]);
}
