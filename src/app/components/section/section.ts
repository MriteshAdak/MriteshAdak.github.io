import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section',
  imports: [],
  template: `
    <section [id]="id()" class="glass-surface scroll-mt-8 p-6 sm:p-8">
      <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="eyebrow">
            {{ eyebrow() }}
          </p>
          <h2 class="heading-1 mt-2">
            {{ title() }}
          </h2>
          @if (description()) {
            <p class="body-text mt-3 max-w-3xl">
              {{ description() }}
            </p>
          }
        </div>

        @if (actionLabel()) {
          <a [href]="actionHref()" class="btn-secondary">
            {{ actionLabel() }}
          </a>
        }
      </div>

      <ng-content></ng-content>
    </section>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionComponent {
  readonly id = input.required<string>();
  readonly eyebrow = input('Overview');
  readonly title = input<string>('');
  readonly description = input('');
  readonly actionLabel = input('');
  readonly actionHref = input('#');
}
