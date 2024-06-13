export interface Filters {
  title: string;
  description: string;
  genres: number[];
  authors: number[];
  publisher: string;
  language: string;
  price__gte: number | null;
  price__lte: number | null;
  stock__gte: number | null;
  stock__lte: number | null;
  format: string;
  rating__gte: number | null;
  rating__lte: number | null;
  age_rating: string[];
  ordering: string;
  page: number;
  page_size: number;
}