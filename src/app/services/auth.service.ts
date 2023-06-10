import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8042/company/login';
  private userDataSubject = new BehaviorSubject<user>({
    id: '',
    name: '',
    email: '',
    token: '',
  });
  public userData$ = this.userDataSubject.asObservable();
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  public loggedIn$ = this.loggedInSubject.asObservable();

  userData: user = {
    id: '',
    name: '',
    email: '',
    token: '',
  };
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.userData.token}`,
  });

  httpOptions = { headers: this.headers };

  constructor(private http: HttpClient, public router: Router) {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    if (userData.token) {
      this.loggedInSubject.next(true);
      this.userDataSubject.next(userData);
    }
  }

  login(email: string, password: string): Observable<any> {
    const credentials = { email: email, password: password };

    return this.http.post(this.apiUrl, credentials).pipe(
      map((response: any) => {
        console.log(response);
        const userData = response.userObject;
        // Store the token in local storage
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log(JSON.parse(localStorage.getItem('userData') || '{}'));
        this.userDataSubject.next(userData);
        this.loggedInSubject.next(true);
        this.userData = response.userObject;
        return userData;
      })
    );
  }

  logout() {
    localStorage.removeItem('userData');
    this.userDataSubject.next({ id: '', name: '', email: '', token: '' });
    this.loggedInSubject.next(false);
    this.router.navigate(['/auth/login']);
  }
}
