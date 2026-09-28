import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle';

interface NavItem {
  readonly label: string;
  readonly href: string;
}

@Component({
  selector: 'app-navbar',
  imports: [ThemeToggleComponent],
  template: `
    <header
      class="fixed top-0 left-0 right-0 z-50 w-full pointer-events-none pb-8"
    >
      <!-- Gradient background and backdrop blur fading smoothly out at the bottom -->
      <div
        class="navbar-mask-fade absolute inset-0 h-full w-full bg-gradient-to-b from-[var(--bg-base)] via-[var(--bg-nav)] to-transparent backdrop-blur-md transition-colors duration-300"
        aria-hidden="true"
      ></div>

      <div
        class="relative pointer-events-auto flex items-center justify-between px-6 sm:px-12 lg:px-20 py-3.5 w-full"
      >
        <!-- Center-left aligned navigation links -->
        <nav
          class="flex flex-wrap items-center gap-1 sm:gap-3 md:gap-5 text-sm font-medium"
          aria-label="Main Navigation"
        >
          @for (item of navItems; track item.href) {
            <a
              [href]="item.href"
              (click)="onLinkClick($event, item.href)"
              class="rounded-lg px-2.5 py-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)]"
              [class.text-[var(--accent-gold)]]="isActive(item.href)"
              [class.bg-[var(--nav-active-bg)]]="isActive(item.href)"
              [class.text-[var(--nav-link)]]="!isActive(item.href)"
              [class.hover:bg-[var(--nav-active-bg)]]="!isActive(item.href)"
              [class.hover:text-[var(--nav-link-hover)]]="!isActive(item.href)"
            >
              {{ item.label }}
            </a>
          }
        </nav>

        <!-- Center-right aligned dark/light mode toggle -->
        <div class="flex items-center pl-3 shrink-0">
          <app-theme-toggle />
        </div>
      </div>
    </header>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  readonly activeId = input<string>('about');
  readonly navClick = output<string>();

  readonly navItems: readonly NavItem[] = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Work Experience', href: '#experiences' },
    { label: 'Academics', href: '#education' },
    { label: 'Connect', href: '#connect' },
  ];

  protected isActive(href: string): boolean {
    const rawId = href.replace('#', '');
    const current = this.activeId();
    return (
      rawId === current ||
      (current === 'home' && rawId === 'about') ||
      (current === 'about' && rawId === 'home')
    );
  }

  protected onLinkClick(event: Event, href: string): void {
    event.preventDefault();
    const targetId = href.replace('#', '');
    this.navClick.emit(targetId);
  }
}
