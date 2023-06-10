import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class TimelineService {
  constructor(private http: HttpClient) {}

  private get httpOptions(): { headers: HttpHeaders } {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userData.token}`,
    });
    return { headers };
  }

  public getPosts(start: number): Observable<any> {
    const url = 'http://localhost:8042/user/post';
    const body = { start: start };
    return this.http.post(url, body, this.httpOptions);
  }

  public getMorePosts(start: number, lastPostSeen: string): Observable<any> {
    const url = 'http://localhost:8042/user/post';
    const body = { start: start, lastPostSeen: lastPostSeen };
    return this.http.post(url, body, this.httpOptions);
  }

  public like(id: string): Observable<any> {
    const url = `http://localhost:8042/user/reaction/${id}`;
    return this.http.post(url, '', this.httpOptions);
  }

  public comment(id: string, comment: string): Observable<any> {
    const url = `http://localhost:8042/user/comment/${id}`;
    const body = { comment: comment };
    return this.http.post(url, body, this.httpOptions);
  }

  public getCompanyPosts(start: number, id: string): Observable<any> {
    const url = `http://localhost:8042/user/companyPosts/${id}`;
    const body = { start: start };
    return this.http.post(url, body, this.httpOptions);
  }

  public getMoreCompanyPosts(
    start: number,
    lastPostSeen: string,
    id: any
  ): Observable<any> {
    const url = `http://localhost:8042/user/companyPosts/${id}`;
    const body = { start: start, lastPostSeen: lastPostSeen };
    return this.http.post(url, body, this.httpOptions);
  }

  public sendPost(content: string, image: File | null): Observable<any> {
    const url = 'http://localhost:8042/company/post';
    const formData = new FormData();
    if (image) {
      formData.append('postImage', image, image.name);
    }
    formData.append('text', content);
    return this.http.post(url, formData, this.httpOptions);
  }
}
