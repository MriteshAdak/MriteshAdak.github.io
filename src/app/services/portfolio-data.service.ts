import { Injectable } from '@angular/core';
import { PortfolioData } from '../interfaces/portfolio-data';

@Injectable({
  providedIn: 'root',
})
export class PortfolioDataService {
  async getPortfolioData(): Promise<PortfolioData> {
    const response = await fetch('/data/portfolio.json', {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to load portfolio data file');
    }

    const payload = (await response.json()) as Partial<PortfolioData>;

    return {
      profile: payload.profile ?? null,
      contact: payload.contact ?? null,
      projects: payload.projects ?? [],
      experiences: payload.experiences ?? [],
      highlights: payload.highlights ?? [],
    };
  }
}
