import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  PLATFORM_ID,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { ConnectItem } from '../../interfaces/connect-item';
import { SectionMeta } from '../../interfaces/section-meta';
import { CarouselComponent } from '../carousel/carousel';
import { ConnectCardComponent } from '../connect-card/connect-card';
import { SectionComponent } from '../section/section';

@Component({
  selector: 'app-connect-section',
  imports: [SectionComponent, CarouselComponent, ConnectCardComponent],
  template: `
    <app-section [id]="meta().id">
      <app-carousel [itemCount]="items().length" [visibleCount]="pageSize()" gapClass="gap-6">
        @for (page of pages(); track $index) {
          <div class="connect-page-slide">
            @for (item of page; track item.id) {
              <app-connect-card [item]="item" />
            }
          </div>
        }
      </app-carousel>
    </app-section>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectSectionComponent {
  readonly meta = input.required<SectionMeta>();
  readonly items = input.required<ConnectItem[]>();

  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly pageSize = signal<number>(6);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const updatePageSize = () => {
        const width = window.innerWidth;
        if (width >= 1024) {
          this.pageSize.set(6);
        } else if (width >= 640) {
          this.pageSize.set(4);
        } else {
          this.pageSize.set(2);
        }
      };

      updatePageSize();
      window.addEventListener('resize', updatePageSize);
      this.destroyRef.onDestroy(() => {
        window.removeEventListener('resize', updatePageSize);
      });
    }
  }

  protected readonly pages = computed(() => {
    const allItems = this.items();
    const size = this.pageSize();
    if (allItems.length === 0) return [[]];
    const chunks: ConnectItem[][] = [];
    for (let i = 0; i < allItems.length; i += size) {
      chunks.push(allItems.slice(i, i + size));
    }
    return chunks;
  });
}
