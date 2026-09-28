import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeService } from '../../services/theme.service';
import { ThemeToggleComponent } from './theme-toggle';

describe('ThemeToggleComponent', () => {
  let component: ThemeToggleComponent;
  let fixture: ComponentFixture<ThemeToggleComponent>;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeToggleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeToggleComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle theme on click', () => {
    themeService.setTheme('dark');
    fixture.detectChanges();
    expect(themeService.isDark()).toBe(true);

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    button.click();
    fixture.detectChanges();

    expect(themeService.isDark()).toBe(false);
    expect(themeService.currentTheme()).toBe('light');

    button.click();
    fixture.detectChanges();

    expect(themeService.isDark()).toBe(true);
    expect(themeService.currentTheme()).toBe('dark');
  });
});
