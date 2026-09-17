export interface SectionMeta {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export interface AboutSectionMeta extends SectionMeta {
  cardEyebrow: string;
}

export interface ProjectsSectionMeta extends SectionMeta {
  cardBadgePrefix: string;
  cardActionLabel: string;
}

export interface ExperiencesSectionMeta extends SectionMeta {
  presentLabel: string;
}

export interface SectionsConfig {
  about: AboutSectionMeta;
  projects: ProjectsSectionMeta;
  experiences: ExperiencesSectionMeta;
  contact: SectionMeta;
}
