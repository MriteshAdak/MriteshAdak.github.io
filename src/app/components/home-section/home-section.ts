import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TagsComponent } from '../tags/tags';

@Component({
  selector: 'app-home-section',
  imports: [TagsComponent],
  template: `
    <section
      id="home"
      class="relative overflow-hidden scroll-mt-8 w-full min-h-screen flex flex-col justify-center pt-20 pb-8 pl-16 sm:pl-20 lg:pl-28 xl:pl-32 pr-0"
    >
      <!-- Target anchor for about link in navigation -->
      <span id="about" class="absolute -top-24"></span>

      <div class="relative w-full flex-1 flex flex-col justify-center">
        <!-- Left: Text content with margin for left progress bar -->
        <div
          class="relative z-10 flex flex-col justify-center max-w-xl sm:max-w-2xl lg:max-w-[50%] xl:max-w-[52%] py-6 lg:py-12"
        >
          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white"
          >
            {{ name() }}
          </h1>

          @if (title()) {
            <p
              class="mt-3 text-lg sm:text-xl lg:text-2xl font-medium text-amber-300"
            >
              {{ title() }}
            </p>
          }

          @if (summary()) {
            <p
              class="body-text mt-6 text-base sm:text-lg leading-relaxed text-slate-300"
            >
              {{ summary() }}
            </p>
          }

          @if (highlights().length > 0) {
            <div class="mt-8">
              <app-tags [tags]="highlights()" />
            </div>
          }
        </div>

        <!-- Right: Photo strictly right-aligned to the window edge -->
        <div
          class="relative w-full h-80 sm:h-96 lg:h-full lg:absolute lg:top-0 lg:bottom-0 lg:right-0 lg:w-[48%] xl:w-[46%] overflow-hidden pointer-events-none"
        >
          @if (pictureUrl()) {
            <img
              [src]="pictureUrl()!"
              [alt]="pictureAlt()"
              class="h-full w-full object-cover object-top lg:object-center hero-image-mask"
            />
          }

          <!-- Gradient overlays to ensure smooth fade into background -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"
          ></div>
          <div
            class="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90"
          ></div>
        </div>
      </div>
    </section>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeSectionComponent {
  readonly name = input.required<string>();
  readonly title = input<string>('');
  readonly summary = input<string>('');
  readonly pictureUrl = input<string | null | undefined>();
  readonly pictureAlt = input<string>('Portrait of Mritesh Adak');
  readonly highlights = input<readonly string[]>([]);
}
