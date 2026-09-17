import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactSectionComponent } from './contact-section';

describe('ContactSectionComponent', () => {
  let component: ContactSectionComponent;
  let fixture: ComponentFixture<ContactSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactSectionComponent);
    fixture.componentRef.setInput('meta', {
      id: 'contact',
      eyebrow: 'Contact',
      title: 'Get in Touch',
      description: 'Reach out anytime.',
    });
    fixture.componentRef.setInput('items', [
      {
        id: 'email',
        channel: 'Email',
        value: 'test@example.com',
        href: 'mailto:test@example.com',
        actionLabel: 'Send email',
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
