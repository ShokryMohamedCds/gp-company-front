import { Profile } from './../models/profile';
import { user } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { UserService } from '../services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface jobTitle {
  name: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  myForm!: FormGroup;
  image: string | undefined;
  countries: any = [];
  cities: any = [];
  industryOptions = [
    'Management',
    'Marketing and Advertising',
    'Sales',
    'Customer Service',
    'Human Resources',
    'Accounting and Finance',
    'Information Technology',
    'Engineering',
    'Operations and Logistics',
    'Research and Development',
    'Legal and Regulatory Affairs',
    'Health and Safety',
    'Quality Control and Assurance',
    'Supply Chain Management',
    'Project Management',
    'Product Development',
    'Consulting',
    'Education and Training',
    'Administration and Support',
    'Media and Communications',
    'Agriculture and Farming',
    'Mining and Extraction',
    'Construction',
    'Transportation and Logistics',
    'Energy and Utilities',
    'Financial Services',
    'Healthcare and Pharmaceuticals',
    'Hospitality and Tourism',
    'Retail and Wholesale',
    'Real Estate',
    'Media and Entertainment',
    'Government and Public Services',
    'other',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private datePipe: DatePipe,
    private user: UserService
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numberOfemployee: ['', Validators.required],
      about: ['', Validators.required],
      industry: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      number: ['', Validators.required],
      address: ['', Validators.required],
    });
    this.getCountries();
    this.user.getUserInfo().subscribe(
      (response) => {
        if (response.data.country) {
          this.onCountrySelection(response.data.country);
        }
        this.countries.push(response.data.country);

        this.cities.push(response.data.city);
        this.image = response.data.image;
        console.log(response);
        this.myForm.setValue({
          name: response.data.name,
          email: response.data.email,
          numberOfemployee: response.data.numberOfemployee,
          about: response.data.about,
          industry: response.data.industry,
          country: response.data.country,
          city: response.data.city,
          number: response.data.number,
          address: response.data.address,
        });
        // this.myForm.patchValue(response.data);
      },
      (error) => console.log(error)
    );
  }
  getCountries() {
    this.http.get('http://localhost:8042/user/country').subscribe(
      (response) => {
        this.countries = response;
      },
      (error) => console.log(error)
    );
  }

  submitForm(): void {
    if (this.myForm.valid) {
      const formValue = this.myForm.value;
      console.log(formValue);
      this.user.updateProfile(formValue);
      Swal.fire('Good job!', 'Your Profile Updated Successfully', 'success');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong while updating profile!',
      });
    }
  }
  onCountrySelection(country: string): void {
    this.http
      .post('http://localhost:8042/user/city', { country: country })
      .subscribe(
        (response) => {
          this.cities = response;
        },
        (error) => console.log(error)
      );
  }
}
