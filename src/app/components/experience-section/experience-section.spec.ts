import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperienceSectionComponent } from './experience-section';

describe('ExperienceSectionComponent', () => {
  let component: ExperienceSectionComponent;
  let fixture: ComponentFixture<ExperienceSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceSectionComponent);
    fixture.componentRef.setInput('meta', {
      id: 'experiences',
      eyebrow: 'Experiences',
      title: 'Timeline',
      description: 'My past work experience.',
      presentLabel: 'Present',
    });
    fixture.componentRef.setInput('experiences', [
      {
        id: 1,
        company: 'Company A',
        role: 'Engineer',
        summary: 'Did engineering work.',
        period: '2020 — 2022',
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
});
