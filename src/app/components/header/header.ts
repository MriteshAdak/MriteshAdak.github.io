import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <header class="glass-surface-light flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div class="flex items-center gap-4">
        @if (pictureUrl()) {
          <img [src]="pictureUrl()" alt="Profile Picture" class="w-16 h-16 rounded-full ring-2 ring-white/20 shadow-lg object-cover" />
        }
        <div>
          <p class="eyebrow">Portfolio</p>
          <h1 class="heading-1 mt-2">
            {{ heading() }}
          </h1>
        </div>
      </div>

      <a href="#contact" class="btn-primary">
        Contact
      </a>
    </header>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly heading = input.required<string>();
  readonly pictureUrl = input<string | undefined>();
}
