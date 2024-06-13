import { Author } from './author';
import { BookFormat } from './book-format';
import { Genre } from './genre';
import { Publisher } from './publisher';

export interface Book {
  id: number;
  title: string;
  description: string;
  genres: Genre[];
  authors: Author[];
  publisher: Publisher | null;
  publication_date: string | null;
  cover_image: string | null;
  num_pages: number | null;
  language: string;
  price: number;
  stock: number;
  format: BookFormat | null;
  rating: number;
  age_rating: string;
}
