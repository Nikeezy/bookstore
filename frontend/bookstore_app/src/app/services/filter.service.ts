import { Injectable } from '@angular/core';
import { Filters } from '../models/filters';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


const defaultFilters: Filters = {
  title: '',
  description: '',
  genres: [],
  authors: [],
  publisher: '',
  language: '',
  price__gte: null,
  price__lte: null,
  stock__gte: null,
  stock__lte: null,
  format: '',
  rating__gte: null,
  rating__lte: null,
  age_rating: [],
  ordering: '-rating',
  page: 1,
  page_size: 6,
};

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filterSubject = new BehaviorSubject<Filters>({...defaultFilters});
  filter$ = this.filterSubject.asObservable();

  setFilters(newFilters: Partial<Filters>): void {
    const currentFilters = this.filterSubject.getValue();
    const updatedFilters = { ...currentFilters, ...newFilters };
    this.filterSubject.next(updatedFilters);
  }

  setParameter(parameterName: keyof Filters, parameterValue: any): void {
    const currentFilters = this.filterSubject.getValue();
    const updatedFilters = { ...currentFilters, [parameterName]: parameterValue };
    this.filterSubject.next(updatedFilters);
  }

  getFilters(): Filters {
    return this.filterSubject.getValue();
  }
}
