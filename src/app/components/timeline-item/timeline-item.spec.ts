import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimelineItemComponent } from './timeline-item';

describe('TimelineItemComponent', () => {
  let component: TimelineItemComponent;
  let fixture: ComponentFixture<TimelineItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineItemComponent);
    fixture.componentRef.setInput('item', {
      id: 1,
      title: 'Master of Science in Computer Science',
      subtitle: 'University of Texas at Dallas',
      period: 'Aug 2025 — May 2027',
      displayOrder: 0,
    });
    fixture.componentRef.setInput('presentLabel', 'Present');
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title, subtitle, and period', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h3')?.textContent).toContain('Master of Science in Computer Science');
    expect(el.textContent).toContain('University of Texas at Dallas');
    expect(el.textContent).toContain('Aug 2025 — May 2027');
  });

  it('should render description when provided', async () => {
    fixture.componentRef.setInput('item', {
      id: 2,
      title: 'Software Engineer',
      subtitle: 'Tech Corp',
      period: '2022 — Present',
      description: 'Built scalable cloud solutions.',
      displayOrder: 1,
    });
    fixture.detectChanges();
    await fixture.whenStable();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Built scalable cloud solutions.');
  });
});
