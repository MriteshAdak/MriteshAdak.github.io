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
    fixture.componentRef.setInput('title', 'Test Section Title');
    fixture.componentRef.setInput('eyebrow', 'Test Eyebrow');
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and eyebrow', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h2')?.textContent).toContain('Test Section Title');
    expect(el.querySelector('.eyebrow')?.textContent).toContain('Test Eyebrow');
  });
});
