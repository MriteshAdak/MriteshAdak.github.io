import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section',
  imports: [],
  template: `
    <section
      [id]="id()"
      class="relative flex flex-col justify-center w-full min-h-screen pt-20 pb-8 pl-16 sm:pl-20 lg:pl-28 xl:pl-32 pr-6 sm:pr-10 lg:pr-14 xl:pr-16"
    >
      <div class="w-full flex flex-col justify-center flex-1 min-h-0">
        <ng-content></ng-content>
      </div>
    </section>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionComponent {
  readonly id = input.required<string>();
}
