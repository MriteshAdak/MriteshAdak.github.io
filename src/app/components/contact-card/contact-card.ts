import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ContactItem } from '../../interfaces/contact-item';

@Component({
  selector: 'app-contact-card',
  imports: [],
  host: {
    class: 'block h-full',
  },
  template: `
    <a
      [href]="item().href"
      [target]="isExternal() ? '_blank' : '_self'"
      [rel]="isExternal() ? 'noopener noreferrer' : ''"
      class="glass-surface-light glass-surface-interactive flex h-full flex-col justify-between p-5"
    >
      <div>
        <p class="eyebrow">{{ item().channel }}</p>
        <p class="mt-3 text-base sm:text-lg font-medium text-white break-words">{{ item().value }}</p>
      </div>
      @if (item().actionLabel) {
        <p class="mt-4 text-xs font-medium uppercase tracking-wider text-cyan-300">
          {{ item().actionLabel }} &rarr;
        </p>
      }
    </a>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactCardComponent {
  readonly item = input.required<ContactItem>();

  protected readonly isExternal = computed(() => this.item().href.startsWith('http'));
}
