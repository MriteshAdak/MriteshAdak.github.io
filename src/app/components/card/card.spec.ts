import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Project } from '../../interfaces/project';
import { CardComponent } from './card';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  const mockProject: Project = {
    id: 1,
    name: 'Test Project',
    description: 'A test project description',
    projectUrl: 'https://example.com/test',
    tags: ['Angular', 'TypeScript'],
    displayOrder: 0,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    fixture.componentRef.setInput('project', mockProject);
    fixture.componentRef.setInput('badgePrefix', 'Project');
    fixture.componentRef.setInput('actionLabel', 'View project');
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render project name and tags', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h3')?.textContent).toContain('Test Project');
    expect(el.textContent).toContain('Angular');
    expect(el.textContent).toContain('TypeScript');
  });
});
