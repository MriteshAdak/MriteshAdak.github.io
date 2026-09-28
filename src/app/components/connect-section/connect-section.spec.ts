import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnectSectionComponent } from './connect-section';

describe('ConnectSectionComponent', () => {
  let component: ConnectSectionComponent;
  let fixture: ComponentFixture<ConnectSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectSectionComponent);
    fixture.componentRef.setInput('meta', {
      id: 'connect',
      eyebrow: 'Connect',
      title: 'Connect',
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

  it('should chunk up to 6 items into a single page', () => {
    const items = Array.from({ length: 6 }, (_, i) => ({
      id: `item-${i}`,
      channel: `Channel ${i}`,
      value: `val-${i}`,
      href: `https://example.com/${i}`,
    }));
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();

    expect(component['pages']().length).toBe(1);
    expect(component['pages']()[0].length).toBe(6);
  });

  it('should chunk more than 6 items into multiple pages on desktop', () => {
    const items = Array.from({ length: 7 }, (_, i) => ({
      id: `item-${i}`,
      channel: `Channel ${i}`,
      value: `val-${i}`,
      href: `https://example.com/${i}`,
    }));
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();

    expect(component['pages']().length).toBe(2);
    expect(component['pages']()[0].length).toBe(6);
    expect(component['pages']()[1].length).toBe(1);
  });

  it('should chunk into 2 items per page on mobile (2x1 grid)', () => {
    component['pageSize'].set(2);
    const items = Array.from({ length: 3 }, (_, i) => ({
      id: `item-${i}`,
      channel: `Channel ${i}`,
      value: `val-${i}`,
      href: `https://example.com/${i}`,
    }));
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();

    expect(component['pages']().length).toBe(2);
    expect(component['pages']()[0].length).toBe(2);
    expect(component['pages']()[1].length).toBe(1);
  });
});
