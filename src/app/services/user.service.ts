import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8042';

  constructor(private http: HttpClient) {}

  private get httpOptions(): { headers: HttpHeaders } {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userData.token}`,
    });
    return { headers };
  }

  public postImage(formData: FormData): Observable<any> {
    const url = `${this.apiUrl}/company/companyImage`;
    return this.http.post(url, formData, this.httpOptions);
  }

  public getUserInfo(): Observable<any> {
    const url = `${this.apiUrl}/company/profile`;
    return this.http.get(url, this.httpOptions);
  }

  public updateProfile(profileData: any): void {
    console.log(profileData);

    this.http
      .post('http://localhost:8042/company/edit', profileData, this.httpOptions)
      .subscribe(
        (response) => {
          console.log(response); // handle the response from the backend
        },
        (error) => {
          console.error(error); // handle errors
        }
      );
  }
}
