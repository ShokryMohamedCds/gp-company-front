import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { user } from 'src/app/models/user';
import { FormControl } from '@angular/forms';
import { CompanyService } from '../../services/company.service';
import { Company } from 'src/app/models/company';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  companyCtrl = new FormControl();
  searchTerm: string = '';
  title = 'Gp';
  userData: user | any = { id: '', name: '', email: '', token: '' };
  loggedIn = false;
  companies: Company[] = [];
  users: Users[] = [];
  combinedArray: (Company | Users)[] = [];

  constructor(
    public router: Router,
    private auth: AuthService,
    private company: CompanyService
  ) {}

  ngOnInit() {
    this.auth.loggedIn$.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });
    this.auth.userData$.subscribe((userData) => {
      this.userData = userData;
    });
  }
  onCompanySelected(company: any) {
    const exists = this.companies.some((item) => item._id === company._id);
    console.log(exists);

    if (exists) {
      this.router.navigate(['/company', company._id]);
    } else {
      this.router.navigate(['/user', company._id]);
    }
  }
  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement)?.value;
    console.log(value);
    if (value) {
      this.company.search(value).subscribe(
        (results: any) => {
          this.companies = results.companies;
          this.users = results.users;
          let combinedArray = [...this.companies, ...this.users];
          this.combinedArray = combinedArray;

          // Do something with the search results
        },
        (error: any) => {
          console.log('Error occurred while searching for companies:', error);
        }
      );
    } else {
      this.combinedArray = [];
    }
  }

  onLogout(): void {
    this.auth.logout();
  }
}
