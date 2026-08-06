import { ChangeDetectionStrategy, Component, OnInit, inject, signal, computed } from '@angular/core';
import { CarouselComponent } from '../../components/carousel/carousel';
import { HeaderComponent } from '../../components/header/header';
import { SectionComponent } from '../../components/section/section';
import { TagsComponent } from '../../components/tags/tags';
import { Experience } from '../../interfaces/experience';
import { PortfolioData } from '../../interfaces/portfolio-data';
import { PortfolioDataService } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-landing-page',
  imports: [HeaderComponent, SectionComponent, CarouselComponent, TagsComponent],
  template: `
    <main class="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <app-header [heading]="profile()?.fullName ?? 'Portfolio'" [pictureUrl]="profile()?.pictureUrl" />

      @if (loading()) {
        <section class="glass-surface p-6 sm:p-8" aria-busy="true">
          <p class="body-text">Loading portfolio data...</p>
        </section>
      } @else if (errorMessage()) {
        <section class="glass-surface border-rose-400/30 bg-rose-400/10 p-6 sm:p-8" role="alert">
          <p class="body-text text-rose-100">{{ errorMessage() }}</p>
        </section>
      } @else if (portfolio()) {
        <app-section
          id="about"
          eyebrow="About Me"
          [title]="'M.Sc. Computer Science Student'"
          [description]="profile()?.summary ?? ''"
          actionLabel="Jump to projects"
          actionHref="#projects"
        >
          <div class="grid gap-4">
            <div class="glass-surface-light glass-surface-interactive p-6">
              <p class="eyebrow">Summary</p>
              <p class="body-text mt-4 mb-4">
                {{ profile()?.headline }}
              </p>
              <app-tags class="mt-5" [tags]="highlights()" />
            </div>
          </div>
        </app-section>

        <app-section
          id="projects"
          eyebrow="Projects"
          title="Personal Projects"
          description="The projects built so far as a computer science student, with more to come as I continue to learn and grow in my skills."
        >
          <app-carousel [projects]="projects()" />
        </app-section>

        <app-section
          id="experiences"
          eyebrow="Experiences"
          title="Employment Timeline"
          description="A concise timeline of the roles and responsibilities that shape the skills you see above."
        >
          <div class="space-y-4">
            @for (experience of experiences(); track experience.id) {
              <article class="glass-surface-light glass-surface-interactive grid gap-4 p-5 sm:grid-cols-[0.85fr_1.15fr] sm:p-6">
                <div>
                  <p class="eyebrow">{{ formatPeriod(experience) }}</p>
                  <h3 class="mt-2 text-xl font-semibold text-white">{{ experience.role }}</h3>
                  <p class="body-text mt-1 text-sm">{{ experience.company }}</p>
                </div>

                <p class="body-text text-sm">{{ experience.summary }}</p>
              </article>
            }
          </div>
        </app-section>

        <app-section
          id="contact"
          eyebrow="Contact details"
          title="Reach me directly"
          description="Email, LinkedIn, and GitHub"
        >
          <div class="grid gap-4 md:grid-cols-3">
            <a [href]="'mailto:' + (contact()?.email ?? '')" class="glass-surface-light glass-surface-interactive p-5">
              <p class="eyebrow">Email</p>
              <p class="mt-3 text-lg font-medium text-white">{{ contact()?.email }}</p>
            </a>
            <a [href]="contact()?.linkedinUrl ?? '#'" target="_blank" rel="noopener noreferrer" class="glass-surface-light glass-surface-interactive p-5">
              <p class="eyebrow">LinkedIn</p>
              <p class="mt-3 text-lg font-medium text-white">Open profile</p>
            </a>
            <a [href]="contact()?.githubUrl ?? '#'" target="_blank" rel="noopener noreferrer" class="glass-surface-light glass-surface-interactive p-5">
              <p class="eyebrow">GitHub</p>
              <p class="mt-3 text-lg font-medium text-white">Browse source</p>
            </a>
          </div>
        </app-section>
      }
    </main>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent implements OnInit {
  private readonly portfolioDataService = inject(PortfolioDataService);

  protected readonly loading = signal(true);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly portfolio = signal<PortfolioData | null>(null);

  protected readonly projects = computed(() => this.portfolio()?.projects ?? []);
  protected readonly experiences = computed(() => this.portfolio()?.experiences ?? []);
  protected readonly profile = computed(() => this.portfolio()?.profile);
  protected readonly contact = computed(() => this.portfolio()?.contact);
  protected readonly highlights = computed(() => this.portfolio()?.highlights ?? []);

  async ngOnInit(): Promise<void> {
    await this.loadPortfolioData();
  }

  private async loadPortfolioData(): Promise<void> {
    this.loading.set(true);
    this.errorMessage.set(null);

    try {
      const data = await this.portfolioDataService.getPortfolioData();
      this.portfolio.set(data);
    } catch {
      this.errorMessage.set('Unable to load portfolio data from data file.');
    } finally {
      this.loading.set(false);
    }
  }

  protected formatPeriod(experience: Experience): string {
    const start = new Date(experience.startDate).getFullYear();
    const end = experience.isCurrent || !experience.endDate ? 'Present' : new Date(experience.endDate).getFullYear();
    return `${start} — ${end}`;
  }
  }