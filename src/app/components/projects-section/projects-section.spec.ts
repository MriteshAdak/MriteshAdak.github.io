import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsSectionComponent } from './projects-section';

describe('ProjectsSectionComponent', () => {
  let component: ProjectsSectionComponent;
  let fixture: ComponentFixture<ProjectsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsSectionComponent);
    fixture.componentRef.setInput('meta', {
      id: 'projects',
      eyebrow: 'Projects',
      title: 'Personal Projects',
      description: 'Projects built so far.',
      cardBadgePrefix: 'Project',
      cardActionLabel: 'View project',
    });
    fixture.componentRef.setInput('projects', [
      {
        id: 1,
        name: 'Test Project',
        description: 'Test description',
        projectUrl: 'https://example.com',
        tags: ['Angular'],
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
