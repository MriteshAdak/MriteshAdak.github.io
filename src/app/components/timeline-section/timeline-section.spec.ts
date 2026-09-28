import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimelineSectionComponent } from './timeline-section';

describe('TimelineSectionComponent', () => {
  let component: TimelineSectionComponent;
  let fixture: ComponentFixture<TimelineSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineSectionComponent);
    fixture.componentRef.setInput('meta', {
      id: 'education',
      eyebrow: 'Education',
      title: 'Academic Background',
      description: 'A brief overview of my academic journey.',
      presentLabel: 'Present',
    });
    fixture.componentRef.setInput('items', [
      {
        id: 1,
        title: 'Master of Science in Computer Science',
        subtitle: 'University of Texas at Dallas',
        period: 'Aug 2025 — May 2027',
        displayOrder: 0,
      },
    ]);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render items', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Master of Science in Computer Science');
    expect(el.textContent).toContain('University of Texas at Dallas');
  });
});
