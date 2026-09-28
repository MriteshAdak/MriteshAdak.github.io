export interface SectionMeta {
  id: string;
  title: string;
  eyebrow?: string;
  description?: string;
  [key: string]: unknown;
}

export interface ProjectsSectionMeta extends SectionMeta {
  cardActionLabel: string;
}

export interface TimelineSectionMeta extends SectionMeta {
  presentLabel?: string;
}

export interface ExperiencesSectionMeta extends TimelineSectionMeta {
  presentLabel: string;
}

export interface SectionsConfig {
  about?: SectionMeta;
  projects: ProjectsSectionMeta;
  experiences: ExperiencesSectionMeta;
  education?: TimelineSectionMeta;
  connect: SectionMeta;
  [key: string]: SectionMeta | undefined;
}
