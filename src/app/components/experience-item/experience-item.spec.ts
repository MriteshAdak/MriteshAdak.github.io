import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperienceItemComponent } from './experience-item';

describe('ExperienceItemComponent', () => {
  let component: ExperienceItemComponent;
  let fixture: ComponentFixture<ExperienceItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceItemComponent);
    fixture.componentRef.setInput('experience', {
      id: 1,
      company: 'Tech Corp',
      role: 'Senior Engineer',
      summary: 'Architected scalable services.',
      period: '2022 — Present',
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

  it('should render role, company, and period', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h3')?.textContent).toContain('Senior Engineer');
    expect(el.textContent).toContain('Tech Corp');
    expect(el.textContent).toContain('2022 — Present');
  });
});
