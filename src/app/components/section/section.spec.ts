import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionComponent } from './section';

describe('SectionComponent', () => {
  let component: SectionComponent;
  let fixture: ComponentFixture<SectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionComponent);
    fixture.componentRef.setInput('id', 'test-section');
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set section id attribute', () => {
    const el = fixture.nativeElement as HTMLElement;
    const section = el.querySelector('section');
    expect(section?.getAttribute('id')).toBe('test-section');
  });
});
