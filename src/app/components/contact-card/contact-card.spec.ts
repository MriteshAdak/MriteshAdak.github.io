import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactCardComponent } from './contact-card';

describe('ContactCardComponent', () => {
  let component: ContactCardComponent;
  let fixture: ComponentFixture<ContactCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactCardComponent);
    fixture.componentRef.setInput('item', {
      id: 'email',
      channel: 'Email',
      value: 'test@example.com',
      href: 'mailto:test@example.com',
      actionLabel: 'Send email',
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render channel and value', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Email');
    expect(el.textContent).toContain('test@example.com');
    expect(el.textContent).toContain('Send email');
  });
});
