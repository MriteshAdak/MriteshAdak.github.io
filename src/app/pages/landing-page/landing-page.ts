import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AboutSectionComponent } from '../../components/about-section/about-section';
import { ContactSectionComponent } from '../../components/contact-section/contact-section';
import { ExperienceSectionComponent } from '../../components/experience-section/experience-section';
import { HeaderComponent } from '../../components/header/header';
import { ProjectsSectionComponent } from '../../components/projects-section/projects-section';
import { PortfolioData } from '../../interfaces/portfolio-data';
import { PortfolioDataService } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-landing-page',
  imports: [
    HeaderComponent,
    AboutSectionComponent,
    ProjectsSectionComponent,
    ExperienceSectionComponent,
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

        <app-about-section
          [meta]="data.sections.about"
          [profile]="data.profile"
          [highlights]="data.highlights"
        />

        <app-projects-section
          [meta]="data.sections.projects"
          [projects]="data.projects"
        />

        <app-experience-section
          [meta]="data.sections.experiences"
          [experiences]="data.experiences"
        />

        <app-contact-section
          [meta]="data.sections.contact"
          [items]="data.contactItems"
        />
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

  async ngOnInit(): Promise<void> {
    await this.loadPortfolioData();
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