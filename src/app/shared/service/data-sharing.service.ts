import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BlogPost } from '../interfaces/blog-post.interface';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private serverUrl = 'http://localhost:3000/api'; // Server URL
  private apiUrl = `${this.serverUrl}/gifsfetch`; // Endpoint for fetching GIFs

  public changedSlides$ = new Subject();
  public blogs: BlogPost[] = [];

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.serverUrl}/upload`, formData).pipe(
      catchError(this.handleError)
    );
  }

  getGifs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.serverUrl}/gifs`).pipe(
      catchError(this.handleError)
    );
  }

  getGifByTitle(title: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?title=${encodeURIComponent(title)}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(`Server Error: ${error.message}`);
    return throwError(() => new Error('Something went wrong with the server.'));
  }
}
