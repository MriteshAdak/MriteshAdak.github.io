import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { PortfolioData } from '../../interfaces/portfolio-data';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { LandingPageComponent } from './landing-page';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let mockPortfolioDataService: { getPortfolioData: ReturnType<typeof vi.fn> };

  const samplePortfolioData: PortfolioData = {
    meta: {
      pageTitle: 'Test Title',
      description: 'Test Description',
      loadingText: 'Loading...',
      errorText: 'Error loading data',
    },
    header: {
      badge: 'Portfolio',
      ctaLabel: 'Connect',
      ctaHref: '#connect',
    },
    sections: {
      about: {
        id: 'about',
        eyebrow: 'About',
        title: 'About Me',
        cardEyebrow: 'Summary',
      },
      education: {
        id: 'education',
        eyebrow: 'Education',
        title: 'Academic Background',
        description: 'Institutions attended.',
      },
      experiences: {
        id: 'experiences',
        eyebrow: 'Experiences',
        title: 'Work History',
        presentLabel: 'Present',
      },
      projects: {
        id: 'projects',
        eyebrow: 'Projects',
        title: 'My Projects',
        cardBadgePrefix: 'Project',
        cardActionLabel: 'View',
      },
      connect: {
        id: 'connect',
        eyebrow: 'Connect',
        title: 'Connect',
      },
    },
    profile: {
      id: 1,
      fullName: 'Test User',
      title: 'Engineer',
      headline: 'Building things',
      summary: 'Summary text',
      pictureUrl: '/test.jpg',
      pictureAlt: 'Test portrait',
    },
    highlights: ['TypeScript', 'Angular'],
    projects: [
      {
        id: 1,
        name: 'Project One',
        description: 'A test project.',
        projectUrl: 'https://example.com/project-one',
        tags: ['Angular'],
        displayOrder: 0,
      },
    ],
    experiences: [
      {
        id: 1,
        company: 'Company A',
        role: 'Engineer',
        summary: 'Developing software.',
        period: '2023 — Present',
        displayOrder: 0,
      },
    ],
    education: [
      {
        id: 1,
        institution: 'University of Texas at Dallas',
        degree: 'Master of Science in Computer Science',
        period: 'Aug 2025 — May 2027',
        isCurrent: true,
        location: 'Richardson, TX',
        displayOrder: 0,
      },
    ],
    connectItems: [
      {
        id: 'email',
        channel: 'Email',
        value: 'test@example.com',
        href: 'mailto:test@example.com',
        actionLabel: 'Send email',
      },
    ],
  };

  beforeEach(async () => {
    mockPortfolioDataService = {
      getPortfolioData: vi.fn().mockResolvedValue(samplePortfolioData),
    };

    await TestBed.configureTestingModule({
      imports: [LandingPageComponent],
      providers: [
        { provide: PortfolioDataService, useValue: mockPortfolioDataService },
        Title,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    await Promise.resolve();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render sections including education dynamically based on portfolio keys', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Master of Science in Computer Science');
    expect(el.textContent).toContain('University of Texas at Dallas');
    expect(el.textContent).toContain('Richardson, TX');
    expect(el.textContent).toContain('Company A');
    expect(el.textContent).toContain('Project One');
  });

  it('should display error message when data loading fails', async () => {
    mockPortfolioDataService.getPortfolioData.mockRejectedValue(new Error('Network error'));
    const errorFixture = TestBed.createComponent(LandingPageComponent);
    errorFixture.detectChanges();
    await errorFixture.whenStable();
    await Promise.resolve();
    errorFixture.detectChanges();

    const el = errorFixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Unable to load portfolio data. Please try again later.');
  });
});
