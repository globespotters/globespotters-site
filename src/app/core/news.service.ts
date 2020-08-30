import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { NewsArticle } from '../shared/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private handleError(error: any): Observable<never> {
      console.error('server error:', error);
      if (error.error instanceof Error) {
        const errMessage = error.error.message;
        return Observable.throw(errMessage);
      }
      return Observable.throw(error || 'Server error');
  }

  constructor(private http: HttpClient) { }
  getArticles(): Observable<NewsArticle[]> {
    return this.http.get<NewsArticle[]>('assets/dummy-article-data.json')
      .pipe(catchError(this.handleError)
      );

  }
}
