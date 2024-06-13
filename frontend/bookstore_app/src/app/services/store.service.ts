import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FilterService } from './filter.service';
import { Genre } from '../models/genre';
import { Author } from '../models/author';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiUrl = 'http://localhost:8000/api/store';

  constructor(private http: HttpClient, private filterService: FilterService ) { }

  private getHttpParams(filters?: any): HttpParams {
    let params = new HttpParams();
    const currentFilters = filters || this.filterService.getFilters();

    Object.keys(currentFilters).forEach(key => {
      if (currentFilters[key]) {
        if (Array.isArray(currentFilters[key])) {
          if (currentFilters[key].length > 0) {
            params = params.set(key, currentFilters[key].join(','));
          }
        } else {
          params = params.set(key, currentFilters[key]);
        }
      }
    });
    
    return params;
  }

  getBooks(filters?: any): Observable<any> {
    const params = this.getHttpParams(filters);
    return this.http.get<any>(`${this.apiUrl}/books`, { params: params });
  }

  getBookById(id: string | number): Observable<any> {
    const params = this.getHttpParams({id: id})
    return this.http.get<any>(`${this.apiUrl}/books`, {params: params})
  }

  getGenres(page: number = 1, pageSize: number = 24): Observable<Genre[]> {
    let queryParams  = new HttpParams();

    queryParams  = queryParams .set('page', page);
    queryParams  = queryParams .set('page_size', pageSize);

    return this.http.get<any>(`${this.apiUrl}/genres`, { params:queryParams }).pipe(
      map(response => response.results)
    )
  }

  getAuthors(term: string): Observable<Author[]> {
    const params = this.getHttpParams({full_name: term})
    return this.http.get<any>(`${this.apiUrl}/authors`, { params:params })
  }
}
