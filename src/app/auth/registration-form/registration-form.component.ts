import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  countries: any = [];
  cities: any = [];
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      birthdate: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      number: ['', Validators.required],
    });
    this.getCountries();
  }
  getCountries() {
    this.http.get('http://localhost:8042/user/country').subscribe(
      (response) => {
        this.countries = response;
      },
      (error) => console.log(error)
    );
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

  onSubmit() {
    const formattedDate = this.datePipe.transform(
      this.registrationForm.value.birthdate,
      'dd/MM/yyyy'
    );

    const body = {
      name: this.registrationForm.value.name,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      birthdate: formattedDate,
      city: this.registrationForm.value.city,
      country: this.registrationForm.value.country,
      number: this.registrationForm.value.number,
    };
    const formData = this.registrationForm.value;
    this.http.post('http://localhost:8042/user/register', body).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['auth/sendotp', body.email]);
        Swal.fire('Good job!', 'You Registred Successfully', 'success');
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Make sure to enter a correct data and full all fields!',
        });
      }
    );
  }
}
