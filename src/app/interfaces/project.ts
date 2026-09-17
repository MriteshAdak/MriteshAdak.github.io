export interface Project {
  id: number;
  name: string;
  description: string;
  projectUrl: string;
  imageUrl?: string | null;
  tags: string[];
  displayOrder: number;
}
