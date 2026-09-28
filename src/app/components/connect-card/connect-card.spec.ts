import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnectCardComponent } from './connect-card';

describe('ConnectCardComponent', () => {
  let component: ConnectCardComponent;
  let fixture: ComponentFixture<ConnectCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectCardComponent);
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
