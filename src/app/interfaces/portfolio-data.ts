import { ContactItem } from './contact-item';
import { Experience } from './experience';
import { HeaderConfig } from './header-config';
import { PageMeta } from './page-meta';
import { Project } from './project';
import { SectionsConfig } from './section-meta';
import { UserProfile } from './user-profile';

export interface PortfolioData {
  meta: PageMeta;
  header: HeaderConfig;
  sections: SectionsConfig;
  profile: UserProfile | null;
  highlights: string[];
  projects: Project[];
  experiences: Experience[];
  contactItems: ContactItem[];
}