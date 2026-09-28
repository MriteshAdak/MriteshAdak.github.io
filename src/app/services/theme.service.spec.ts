import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle between dark and light themes', () => {
    service.setTheme('dark');
    expect(service.isDark()).toBe(true);

    service.toggleTheme();
    expect(service.isDark()).toBe(false);
    expect(service.currentTheme()).toBe('light');

    service.toggleTheme();
    expect(service.isDark()).toBe(true);
    expect(service.currentTheme()).toBe('dark');
  });
});
