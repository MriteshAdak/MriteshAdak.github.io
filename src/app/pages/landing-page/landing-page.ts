import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CarouselProgressComponent, CarouselSectionMeta } from '../../components/carousel-progress/carousel-progress';
import { ConnectSectionComponent } from '../../components/connect-section/connect-section';
import { HomeSectionComponent } from '../../components/home-section/home-section';
import { NavbarComponent } from '../../components/navbar/navbar';
import { ProjectsSectionComponent } from '../../components/projects-section/projects-section';
import { TimelineSectionComponent } from '../../components/timeline-section/timeline-section';
import { PortfolioData } from '../../interfaces/portfolio-data';
import { TimelineItem } from '../../interfaces/timeline-item';
import { PortfolioDataService } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-landing-page',
  imports: [
    NavbarComponent,
    CarouselProgressComponent,
    HomeSectionComponent,
    ProjectsSectionComponent,
    TimelineSectionComponent,
    ConnectSectionComponent,
  ],
  template: `
    <main class="relative min-h-screen w-full overflow-hidden">
      <!-- Fixed Top Navigation Bar spanning whole window width -->
      <app-navbar
        [activeId]="activeSectionId()"
        (navClick)="scrollToSection($event)"
      />

      <!-- Left Vertical Carousel Progress Bar -->
      <app-carousel-progress
        [sections]="carouselSections"
        [activeSectionId]="activeSectionId()"
        (sectionSelect)="scrollToSection($event)"
        (next)="goToNextSection()"
        (prev)="goToPrevSection()"
      />

      <!-- Full-Page Carousel Scroll Container spanning 100% window width and height -->
      <div
        #carouselContainer
        (scroll)="onContainerScroll()"
        class="h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        @if (portfolio(); as data) {
          <!-- 1: About / Home Section Slide -->
          <div
            id="about"
            data-section="about"
            class="min-h-screen w-full snap-start snap-always flex flex-col justify-center"
          >
            <app-home-section
              [name]="data.profile?.fullName ?? 'Mritesh Adak'"
              [title]="data.profile?.title || ''"
              [summary]="data.profile?.headline ?? ''"
              [pictureUrl]="data.profile?.pictureUrl"
              [pictureAlt]="data.profile?.pictureAlt ?? 'Portrait of Mritesh Adak'"
              [highlights]="data.highlights"
            />
          </div>

          <!-- 2: Portfolio / Projects Section Slide -->
          <div
            id="projects"
            data-section="projects"
            class="min-h-screen w-full snap-start snap-always flex flex-col justify-center"
          >
            <app-projects-section
              [meta]="data.sections.projects"
              [projects]="data.projects"
            />
          </div>

          <!-- 3: Experiences / Work Experience Section Slide -->
          <div
            id="experiences"
            data-section="experiences"
            class="min-h-screen w-full snap-start snap-always flex flex-col justify-center"
          >
            <app-timeline-section
              [meta]="data.sections.experiences"
              [items]="experienceItems()"
            />
          </div>

          <!-- 4: Education / Academics Section Slide -->
          @if (data.sections.education; as eduMeta) {
            <div
              id="education"
              data-section="education"
              class="min-h-screen w-full snap-start snap-always flex flex-col justify-center"
            >
              <app-timeline-section
                [meta]="eduMeta"
                [items]="educationItems()"
              />
            </div>
          }

          <!-- 5: Connect Section Slide -->
          <div
            id="connect"
            data-section="connect"
            class="min-h-screen w-full snap-start snap-always flex flex-col justify-center"
          >
            <app-connect-section
              [meta]="data.sections.connect"
              [items]="data.connectItems"
            />
          </div>
        } @else if (loading()) {
          <div class="min-h-screen w-full flex items-center justify-center">
            <section class="p-6 sm:p-8" aria-busy="true">
              <p class="body-text">{{ loadingMessage() }}</p>
            </section>
          </div>
        } @else if (errorMessage()) {
          <div class="min-h-screen w-full flex items-center justify-center">
            <section class="border-rose-400/30 bg-rose-400/10 p-6 sm:p-8 rounded-2xl" role="alert">
              <p class="body-text text-rose-100">{{ errorMessage() }}</p>
            </section>
          </div>
        }
      </div>
    </main>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent implements OnInit {
  private readonly portfolioDataService = inject(PortfolioDataService);
  private readonly titleService = inject(Title);

  protected readonly carouselContainer =
    viewChild<ElementRef<HTMLDivElement>>('carouselContainer');

  readonly carouselSections: readonly CarouselSectionMeta[] = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experiences', label: 'Work Experience' },
    { id: 'education', label: 'Academics' },
    { id: 'connect', label: 'Connect' },
  ];

  protected readonly activeSectionId = signal<string>('about');
  protected readonly loading = signal(true);
  protected readonly loadingMessage = signal('Loading...');
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly portfolio = signal<PortfolioData | null>(null);
  protected readonly experienceItems = computed<TimelineItem[]>(() => {
    const experiences = this.portfolio()?.experiences ?? [];
    return [...experiences]
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((exp) => ({
        id: exp.id,
        title: exp.role,
        subtitle: exp.company,
        period: exp.period,
        startDate: exp.startDate,
        endDate: exp.endDate,
        isCurrent: exp.isCurrent,
        description: exp.summary,
        location: exp.location,
        displayOrder: exp.displayOrder,
      }));
  });

  protected readonly educationItems = computed<TimelineItem[]>(() => {
    const education = this.portfolio()?.education ?? [];
    return [...education]
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((edu) => ({
        id: edu.id,
        title: edu.degree,
        subtitle: edu.institution,
        period: edu.period,
        startDate: edu.startDate,
        endDate: edu.endDate,
        isCurrent: edu.isCurrent,
        description: edu.description,
        location: edu.location,
        displayOrder: edu.displayOrder,
      }));
  });

  async ngOnInit(): Promise<void> {
    await this.loadPortfolioData();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' || event.key === 'PageDown') {
      event.preventDefault();
      this.goToNextSection();
    } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
      event.preventDefault();
      this.goToPrevSection();
    }
  }

  protected scrollToSection(id: string): void {
    const container = this.carouselContainer()?.nativeElement;
    if (!container) return;

    const targetId = id === 'home' ? 'about' : id;
    const targetEl = container.querySelector(
      `[data-section="${targetId}"]`
    ) as HTMLElement | null;

    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.activeSectionId.set(targetId);
    }
  }

  protected goToNextSection(): void {
    const currentId = this.activeSectionId();
    const idx = this.carouselSections.findIndex(
      (s) => s.id === currentId || (currentId === 'home' && s.id === 'about')
    );
    if (idx >= 0 && idx < this.carouselSections.length - 1) {
      this.scrollToSection(this.carouselSections[idx + 1].id);
    }
  }

  protected goToPrevSection(): void {
    const currentId = this.activeSectionId();
    const idx = this.carouselSections.findIndex(
      (s) => s.id === currentId || (currentId === 'home' && s.id === 'about')
    );
    if (idx > 0) {
      this.scrollToSection(this.carouselSections[idx - 1].id);
    }
  }

  protected onContainerScroll(): void {
    const container = this.carouselContainer()?.nativeElement;
    if (!container) return;

    const sectionElements = Array.from(
      container.querySelectorAll<HTMLElement>('[data-section]')
    );
    if (sectionElements.length === 0) return;

    const containerTop = container.scrollTop;
    const containerCenter = containerTop + container.clientHeight / 2;

    let closestId = this.carouselSections[0].id;
    let minDiff = Infinity;

    for (const el of sectionElements) {
      const elCenter = el.offsetTop + el.clientHeight / 2;
      const diff = Math.abs(containerCenter - elCenter);
      if (diff < minDiff) {
        minDiff = diff;
        const sid = el.getAttribute('data-section');
        if (sid) closestId = sid;
      }
    }

    if (this.activeSectionId() !== closestId) {
      this.activeSectionId.set(closestId);
    }
  }

  private async loadPortfolioData(): Promise<void> {
    this.loading.set(true);
    this.errorMessage.set(null);

    try {
      const data = await this.portfolioDataService.getPortfolioData();
      this.portfolio.set(data);
      if (data.meta.pageTitle) {
        this.titleService.setTitle(data.meta.pageTitle);
      }
    } catch {
      this.errorMessage.set('Unable to load portfolio data. Please try again later.');
    } finally {
      this.loading.set(false);
    }
  }
}