import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Project } from '../../interfaces/project';
import { TagsComponent } from '../tags/tags';

@Component({
  selector: 'app-card',
  imports: [TagsComponent, NgOptimizedImage],
  host: {
    class: 'flex flex-col flex-1 h-full min-h-0',
  },
  template: `
    <article class="glass-surface-light glass-surface-interactive group flex flex-col flex-1 h-full min-h-0 overflow-hidden">
      @if (project().imageUrl) {
        <div class="relative h-44 w-full shrink-0">
          <img [ngSrc]="project().imageUrl!" [alt]="project().name" fill class="object-cover" />
        </div>
      }
      <div class="flex flex-1 flex-col justify-between overflow-hidden p-6 sm:p-8 min-h-0">
        <div class="flex flex-1 flex-col min-h-0 overflow-hidden space-y-3">
          <h3 class="text-xl sm:text-2xl font-semibold text-[var(--text-heading)] shrink-0 line-clamp-2 transition-colors duration-300">{{ project().name }}</h3>
          <div class="overflow-y-auto flex-1 pr-1 [scrollbar-width:thin]">
            <p class="body-text text-sm sm:text-base leading-relaxed">{{ project().description }}</p>
          </div>
        </div>

        <div class="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border-surface-subtle)] shrink-0">
          <app-tags [tags]="project().tags" class="flex-1 min-w-0" />
          @if (actionLabel() && project().projectUrl) {
            <a
              [href]="project().projectUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary shrink-0 ml-auto"
            >
              {{ actionLabel() }}
            </a>
          }
        </div>
      </div>
    </article>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  readonly project = input.required<Project>();
  readonly actionLabel = input<string>('');
}
