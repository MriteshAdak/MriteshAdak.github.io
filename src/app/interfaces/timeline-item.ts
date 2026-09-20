export interface TimelineItem {
  id: string | number;
  title: string;
  subtitle: string;
  period?: string;
  startDate?: string;
  endDate?: string | null;
  isCurrent?: boolean;
  description?: string;
  location?: string;
  displayOrder?: number;
}
