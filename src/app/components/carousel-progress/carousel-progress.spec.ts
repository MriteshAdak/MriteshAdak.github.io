import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselProgressComponent, CarouselSectionMeta } from './carousel-progress';

describe('CarouselProgressComponent', () => {
  let component: CarouselProgressComponent;
  let fixture: ComponentFixture<CarouselProgressComponent>;

  const sampleSections: readonly CarouselSectionMeta[] = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experiences', label: 'Work Experience' },
    { id: 'education', label: 'Academics' },
    { id: 'connect', label: 'Connect' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselProgressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselProgressComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('sections', sampleSections);
    fixture.componentRef.setInput('activeSectionId', 'about');
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should render all section buttons and labels', () => {
    fixture.componentRef.setInput('sections', sampleSections);
    fixture.componentRef.setInput('activeSectionId', 'about');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const buttons = host.querySelectorAll('button[aria-label]');
    // 2 nav buttons (prev/next) + 5 step buttons = 7 buttons
    expect(buttons.length).toBe(7);
  });

  it('should keep crossed sections lit in gold without the outer light boundary, and highlight active section with ring', () => {
    // Set active section to index 2 ('experiences')
    fixture.componentRef.setInput('sections', sampleSections);
    fixture.componentRef.setInput('activeSectionId', 'experiences');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const stepButtons = Array.from(host.querySelectorAll('button[aria-label]')).filter(
      (btn) => btn.getAttribute('aria-label') !== 'Previous section' && btn.getAttribute('aria-label') !== 'Next section'
    );

    expect(stepButtons.length).toBe(5);

    // Step 0 ('about') and Step 1 ('projects') are crossed (past) sections:
    // They should be lit (have bg-[var(--accent-gold)]), but NOT have ring-4 or scale-125
    for (let i = 0; i < 2; i++) {
      const dot = stepButtons[i].querySelector('span');
      expect(dot?.classList.contains('bg-[var(--accent-gold)]')).toBe(true);
      expect(dot?.classList.contains('ring-4')).toBe(false);
      expect(dot?.classList.contains('scale-125')).toBe(false);
    }

    // Step 2 ('experiences') is the current active section:
    // It should be lit AND have ring-4 and scale-125
    const activeDot = stepButtons[2].querySelector('span');
    expect(activeDot?.classList.contains('bg-[var(--accent-gold)]')).toBe(true);
    expect(activeDot?.classList.contains('ring-4')).toBe(true);
    expect(activeDot?.classList.contains('scale-125')).toBe(true);

    // Step 3 ('education') and Step 4 ('connect') are upcoming sections:
    // They should NOT be lit
    for (let i = 3; i < 5; i++) {
      const upcomingDot = stepButtons[i].querySelector('span');
      expect(upcomingDot?.classList.contains('bg-[var(--accent-gold)]')).toBe(false);
      expect(upcomingDot?.classList.contains('ring-4')).toBe(false);
      expect(upcomingDot?.classList.contains('scale-125')).toBe(false);
    }
  });

  it('should calculate uniform progress height accurately from 0% at first section to 100% at last section', () => {
    fixture.componentRef.setInput('sections', sampleSections);

    // At first section ('about') -> 0%
    fixture.componentRef.setInput('activeSectionId', 'about');
    fixture.detectChanges();
    let filledLine = fixture.nativeElement.querySelector('.bg-\\[var\\(--accent-gold\\)\\]');
    expect(filledLine.style.height).toBe('0%');

    // At second section ('projects') -> 25%
    fixture.componentRef.setInput('activeSectionId', 'projects');
    fixture.detectChanges();
    filledLine = fixture.nativeElement.querySelector('.bg-\\[var\\(--accent-gold\\)\\]');
    expect(filledLine.style.height).toBe('25%');

    // At middle section ('experiences') -> 50%
    fixture.componentRef.setInput('activeSectionId', 'experiences');
    fixture.detectChanges();
    filledLine = fixture.nativeElement.querySelector('.bg-\\[var\\(--accent-gold\\)\\]');
    expect(filledLine.style.height).toBe('50%');

    // At 4th section ('education') -> 75%
    fixture.componentRef.setInput('activeSectionId', 'education');
    fixture.detectChanges();
    filledLine = fixture.nativeElement.querySelector('.bg-\\[var\\(--accent-gold\\)\\]');
    expect(filledLine.style.height).toBe('75%');

    // At last section ('connect') -> 100%
    fixture.componentRef.setInput('activeSectionId', 'connect');
    fixture.detectChanges();
    filledLine = fixture.nativeElement.querySelector('.bg-\\[var\\(--accent-gold\\)\\]');
    expect(filledLine.style.height).toBe('100%');
  });

  it('should emit sectionSelect when a step dot button is clicked', () => {
    fixture.componentRef.setInput('sections', sampleSections);
    fixture.componentRef.setInput('activeSectionId', 'about');
    fixture.detectChanges();

    const emitSpy = vi.fn();
    component.sectionSelect.subscribe(emitSpy);

    const host = fixture.nativeElement as HTMLElement;
    const projectsBtn = host.querySelector('button[aria-label="Projects"]') as HTMLButtonElement;
    projectsBtn.click();

    expect(emitSpy).toHaveBeenCalledWith('projects');
  });

  it('should disable prev button at first section and next button at last section', () => {
    fixture.componentRef.setInput('sections', sampleSections);

    // At first section
    fixture.componentRef.setInput('activeSectionId', 'about');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const prevBtn = host.querySelector('button[aria-label="Previous section"]') as HTMLButtonElement;
    const nextBtn = host.querySelector('button[aria-label="Next section"]') as HTMLButtonElement;

    expect(prevBtn.disabled).toBe(true);
    expect(nextBtn.disabled).toBe(false);

    // At last section
    fixture.componentRef.setInput('activeSectionId', 'connect');
    fixture.detectChanges();

    expect(prevBtn.disabled).toBe(false);
    expect(nextBtn.disabled).toBe(true);
  });
});
