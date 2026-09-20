export interface Education {
  id: number;
  institution: string;
  degree: string;
  period: string;
  startDate?: string;
  endDate?: string | null;
  isCurrent?: boolean;
  description?: string;
  displayOrder: number;
}
