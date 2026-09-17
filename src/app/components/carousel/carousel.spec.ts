import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Project } from '../../interfaces/project';
import { CarouselComponent } from './carousel';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  const mockProjects: Project[] = [
    {
      id: 1,
      name: 'Project 1',
      description: 'First project description',
      projectUrl: 'https://example.com/1',
      tags: ['Angular'],
      displayOrder: 0,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselComponent);
    fixture.componentRef.setInput('projects', mockProjects);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
