import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Project } from '../../interfaces/project';
import { TagsComponent } from '../tags/tags';

@Component({
  selector: 'app-card',
  imports: [TagsComponent, NgOptimizedImage],
  template: `
    <article class="glass-surface-light glass-surface-interactive group flex h-full flex-col overflow-hidden">
      @if (project().imageUrl) {
        <div class="relative h-44 w-full">
          <img [ngSrc]="project().imageUrl!" [alt]="project().name" fill class="object-cover" />
        </div>
      }
      <div class="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div class="flex items-center justify-between gap-4">
          @if (badgePrefix()) {
            <p class="text-xs uppercase tracking-[0.3em] text-cyan-300">
              {{ badgePrefix() }} {{ project().displayOrder + 1 }}
            </p>
          }
          @if (project().tags.length > 0) {
            <span class="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
              {{ project().tags[0] }}
            </span>
          }
        </div>

        <div class="space-y-3">
          <h3 class="text-xl font-semibold text-white">{{ project().name }}</h3>
          <p class="body-text text-sm">{{ project().description }}</p>
        </div>

        <div class="mt-auto flex flex-wrap items-center justify-between gap-4 pt-3">
          <app-tags [tags]="project().tags" />
          @if (actionLabel() && project().projectUrl) {
            <a [href]="project().projectUrl" target="_blank" rel="noopener noreferrer" class="btn-primary">
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
  readonly badgePrefix = input<string>('');
  readonly actionLabel = input<string>('');
}
