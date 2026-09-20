import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AboutSectionComponent } from '../../components/about-section/about-section';
import { ContactSectionComponent } from '../../components/contact-section/contact-section';
import { HeaderComponent } from '../../components/header/header';
import { ProjectsSectionComponent } from '../../components/projects-section/projects-section';
import { TimelineSectionComponent } from '../../components/timeline-section/timeline-section';
import { PortfolioData } from '../../interfaces/portfolio-data';
import { TimelineItem } from '../../interfaces/timeline-item';
import { PortfolioDataService } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-landing-page',
  imports: [
    HeaderComponent,
    AboutSectionComponent,
    ProjectsSectionComponent,
    TimelineSectionComponent,
    ContactSectionComponent,
  ],
  template: `
    <main class="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      @if (portfolio(); as data) {
        <app-header
          [heading]="data.profile?.fullName ?? ''"
          [badge]="data.header.badge"
          [pictureUrl]="data.profile?.pictureUrl"
          [pictureAlt]="data.profile?.pictureAlt ?? ''"
          [ctaLabel]="data.header.ctaLabel"
          [ctaHref]="data.header.ctaHref"
        />

        @for (key of sectionKeys(); track key) {
          @switch (key) {
            @case ('about') {
              <app-about-section
                [meta]="data.sections.about"
                [profile]="data.profile"
                [highlights]="data.highlights"
              />
            }
            @case ('projects') {
              <app-projects-section
                [meta]="data.sections.projects"
                [projects]="data.projects"
              />
            }
            @case ('experiences') {
              <app-timeline-section
                [meta]="data.sections.experiences"
                [items]="experienceItems()"
              />
            }
            @case ('education') {
              @if (data.sections.education; as eduMeta) {
                <app-timeline-section
                  [meta]="eduMeta"
                  [items]="educationItems()"
                />
              }
            }
            @case ('contact') {
              <app-contact-section
                [meta]="data.sections.contact"
                [items]="data.contactItems"
              />
            }
            @default {
              @if (data.sections[key]; as meta) {
                <app-timeline-section
                  [meta]="meta"
                  [items]="getTimelineItems(key)"
                />
              }
            }
          }
        }
      } @else if (loading()) {
        <section class="glass-surface p-6 sm:p-8" aria-busy="true">
          <p class="body-text">{{ loadingMessage() }}</p>
        </section>
      } @else if (errorMessage()) {
        <section class="glass-surface border-rose-400/30 bg-rose-400/10 p-6 sm:p-8" role="alert">
          <p class="body-text text-rose-100">{{ errorMessage() }}</p>
        </section>
      }
    </main>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent implements OnInit {
  private readonly portfolioDataService = inject(PortfolioDataService);
  private readonly titleService = inject(Title);

  protected readonly loading = signal(true);
  protected readonly loadingMessage = signal('Loading...');
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly portfolio = signal<PortfolioData | null>(null);

  protected readonly sectionKeys = computed<string[]>(() => {
    const sections = this.portfolio()?.sections;
    return sections ? Object.keys(sections) : [];
  });

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
        displayOrder: edu.displayOrder,
      }));
  });

  async ngOnInit(): Promise<void> {
    await this.loadPortfolioData();
  }

  protected getTimelineItems(key: string): TimelineItem[] {
    if (key === 'experiences') {
      return this.experienceItems();
    }
    if (key === 'education') {
      return this.educationItems();
    }
    const rawList = (this.portfolio() as Record<string, unknown> | null)?.[key];
    if (!Array.isArray(rawList)) {
      return [];
    }
    return (rawList as Record<string, unknown>[])
      .map((item, idx) => ({
        id: (item['id'] as string | number | undefined) ?? idx,
        title: ((item['title'] ?? item['role'] ?? item['degree'] ?? '') as string),
        subtitle: ((item['subtitle'] ?? item['company'] ?? item['institution'] ?? '') as string),
        period: ((item['period'] ?? '') as string),
        startDate: (item['startDate'] as string | undefined),
        endDate: (item['endDate'] as string | null | undefined),
        isCurrent: (item['isCurrent'] as boolean | undefined),
        description: ((item['description'] ?? item['summary']) as string | undefined),
        displayOrder: ((item['displayOrder'] ?? idx) as number),
      }))
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
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