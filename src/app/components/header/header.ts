import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <header class="glass-surface-light flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div class="flex items-center gap-4">
        @if (pictureUrl()) {
          <img
            [src]="pictureUrl()!"
            [alt]="pictureAlt()"
            class="h-16 w-16 rounded-full object-cover shadow-lg ring-2 ring-white/20"
          />
        }
        <div>
          @if (badge()) {
            <p class="eyebrow">{{ badge() }}</p>
          }
          <h1 class="heading-1 mt-2">
            {{ heading() }}
          </h1>
        </div>
      </div>

      @if (ctaLabel() && ctaHref()) {
        <a [href]="ctaHref()" class="btn-primary">
          {{ ctaLabel() }}
        </a>
      }
    </header>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly heading = input.required<string>();
  readonly badge = input<string>('');
  readonly pictureUrl = input<string | null | undefined>();
  readonly pictureAlt = input<string>('');
  readonly ctaLabel = input<string>('');
  readonly ctaHref = input<string>('');
}
