import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TagsComponent } from './tags';

describe('TagsComponent', () => {
  let component: TagsComponent;
  let fixture: ComponentFixture<TagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TagsComponent);
    fixture.componentRef.setInput('tags', ['TypeScript', 'Angular', 'Tailwind']);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all tags', () => {
    const el = fixture.nativeElement as HTMLElement;
    const spans = el.querySelectorAll('span');
    expect(spans.length).toBe(3);
    expect(spans[0].textContent?.trim()).toBe('TypeScript');
    expect(spans[1].textContent?.trim()).toBe('Angular');
    expect(spans[2].textContent?.trim()).toBe('Tailwind');
  });
});
