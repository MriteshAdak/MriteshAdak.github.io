import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-tags',
  imports: [],
  template: `
    <div class="flex flex-wrap gap-2">
      @for (tag of tags(); track tag) {
        <span class="inline-flex items-center rounded-full border border-[var(--accent-gold-border)] bg-[var(--accent-gold-subtle)] px-3 py-1 text-xs font-medium text-[var(--accent-gold-text)] transition-colors duration-300">
          {{ tag }}
        </span>
      }
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsComponent {
  readonly tags = input.required<readonly string[]>();
}
