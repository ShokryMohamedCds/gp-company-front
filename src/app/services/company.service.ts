import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}
  private get httpOptions(): { headers: HttpHeaders } {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userData.token}`,
    });
    return { headers };
  }
  public search(searchquery: string): Observable<any> {
    const url = `http://localhost:8042/user/search`;
    return this.http.post(url, { search: searchquery });
  }
  public getCompany(id: string): Observable<any> {
    const url = `http://localhost:8042/company/company/${id}`;
    return this.http.get(url, this.httpOptions);
  }
  public getUser(id: string): Observable<any> {
    const url = `http://localhost:8042/user/account/${id}`;
    return this.http.get(url, this.httpOptions);
  }
  public getAllJobPosts(): Observable<any> {
    const url = `http://localhost:8042/company/alljobpost`;
    return this.http.get(url, this.httpOptions);
  }
  public onDeleteImage(): Observable<any> {
    const url = `http://localhost:8042/Company/delete/image`;
    return this.http.delete(url, this.httpOptions);
  }
  public follow(id: string): Observable<any> {
    const url = `http://localhost:8042/company/follow/${id}`;
    console.log(this.httpOptions);

    return this.http.post(url, '', this.httpOptions);
  }
  public jobPost(jobData: any): Observable<any> {
    const url = `http://localhost:8042/company/jobpost`;
    return this.http.post(url, jobData, this.httpOptions);
  }
  getJobPostById(id: string): Observable<any> {
    const url = `http://localhost:8042/company/onjobpost/${id}`;
    return this.http.get(url, this.httpOptions);
  }
  public sendJobOffer(jobData: any): Observable<any> {
    const url = `http://localhost:8042/company/sendJoboffer`;
    return this.http.post(url, jobData, this.httpOptions);
  }
  getJobOffers(): Observable<any> {
    const url = `http://localhost:8042/company/showMyoffers`;
    return this.http.get(url, this.httpOptions);
  }
}
