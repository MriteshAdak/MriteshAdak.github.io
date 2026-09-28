import { ConnectItem } from './connect-item';
import { Education } from './education';
import { Experience } from './experience';
import { PageMeta } from './page-meta';
import { Project } from './project';
import { SectionsConfig } from './section-meta';
import { UserProfile } from './user-profile';

export interface PortfolioData {
  meta: PageMeta;
  sections: SectionsConfig;
  profile: UserProfile | null;
  highlights: string[];
  projects: Project[];
  experiences: Experience[];
  education?: Education[];
  connectItems: ConnectItem[];
  [key: string]: unknown;
}
