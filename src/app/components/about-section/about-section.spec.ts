import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutSectionComponent } from './about-section';

describe('AboutSectionComponent', () => {
  let component: AboutSectionComponent;
  let fixture: ComponentFixture<AboutSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutSectionComponent);
    fixture.componentRef.setInput('meta', {
      id: 'about',
      eyebrow: 'About Me',
      title: 'Software Developer',
      cardEyebrow: 'Summary',
      actionLabel: 'Jump to projects',
      actionHref: '#projects',
    });
    fixture.componentRef.setInput('profile', {
      id: 1,
      fullName: 'Mritesh Adak',
      title: 'Software Developer',
      headline: 'Full-stack developer building modern apps.',
      summary: 'Passionate about engineering clean systems.',
    });
    fixture.componentRef.setInput('highlights', ['Angular', 'TypeScript']);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render profile headline and highlights', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Full-stack developer building modern apps.');
    expect(el.textContent).toContain('Angular');
    expect(el.textContent).toContain('TypeScript');
  });
});
