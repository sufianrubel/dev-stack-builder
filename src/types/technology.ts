export interface Technology {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  rating: number;
  difficulty: string;
  badge: string;
}

export interface CategoryCoverage {
  frontend: boolean;
  backend: boolean;
  database: boolean;
  language: boolean;
}
