import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { CompanyService } from '../services/company.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.css'],
})
export class JobPostComponent implements OnInit {
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
  employmentTypeOptions = ['women', 'men'];

  jobTypeOptions = ['Full-Time', 'Part-Time', 'Internship', 'other'];
  workingTypeOptions = ['On-site', 'Remote', 'Hybrid'];

  data: any[] = [];

  jobForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private http: HttpClient,
    private datePipe: DatePipe,
    private router: Router
  ) {
    this.jobForm = this.formBuilder.group({
      description: ['', Validators.required],
      industry: ['', Validators.required],
      aboutTheCompany: ['', Validators.required],
      skillsMustHave: this.formBuilder.array([], Validators.required),
      jobRequirements: ['', Validators.required],
      employmentType: ['', Validators.required],
      workingType: ['', Validators.required],
      jobType: ['', Validators.required],
      City: [null, Validators.required],
      Country: [null, Validators.required],
      maxAge: [null, Validators.required],
      address: ['', Validators.required],
      title: ['', Validators.required],
      Benefits: this.formBuilder.array([], Validators.required),
    });
  }

  ngOnInit() {
    this.getCountries();
    this.watchCountryChanges();
    this.watchCityChanges();
    this.getAllJobPosts();
  }

  getAllJobPosts() {
    this.companyService.getAllJobPosts().subscribe(
      (response) => {
        this.data = response;
        console.log(this.data);
        // Handle the job posts data
      },
      (error) => {
        // Handle the error if the request fails
        console.error(error);
      }
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

  watchCountryChanges() {
    this.jobForm.get('Country')?.valueChanges.subscribe((country) => {
      if (country) {
        this.onCountrySelection(country);
      }
    });
  }

  watchCityChanges() {
    this.jobForm.get('City')?.valueChanges.subscribe((city) => {
      if (city) {
        this.jobForm.get('City')?.setValidators(Validators.required);
        this.jobForm.get('City')?.updateValueAndValidity();
      } else {
        this.jobForm.get('City')?.clearValidators();
        this.jobForm.get('City')?.updateValueAndValidity();
      }
    });
  }

  addBenefit(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add the benefit only if it is not empty
    if (value) {
      const benefits = this.jobForm.get('Benefits') as FormArray;
      benefits.push(new FormControl(value));
    }

    // Clear the input value
    if (event.input) {
      event.input.value = '';
    }
  }

  removeBenefit(benefit: string): void {
    const benefits = this.jobForm.get('Benefits') as FormArray;
    const index = benefits.value.indexOf(benefit);

    if (index >= 0) {
      benefits.removeAt(index);
    }
  }

  addMustHaveSkill(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add the skill only if it is not empty
    if (value) {
      const skillsMustHave = this.jobForm.get('skillsMustHave') as FormArray;
      skillsMustHave.push(new FormControl(value));
    }

    // Clear the input value
    if (event.input) {
      event.input.value = '';
    }
  }

  removeMustHaveSkill(skill: string): void {
    const skillsMustHave = this.jobForm.get('skillsMustHave') as FormArray;
    const index = skillsMustHave.value.indexOf(skill);

    if (index >= 0) {
      skillsMustHave.removeAt(index);
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

  submitJobPost() {
    if (this.jobForm.valid) {
      const jobPostData = this.jobForm.value;
      this.companyService.jobPost(jobPostData).subscribe(
        (response) => {
          // Handle the response after successful job post
          console.log(response);
          this.jobForm.reset();
          Swal.fire('Good job!', 'Job Post Added Successfully', 'success');
        },
        (error) => {
          // Handle the error if the job post fails
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong while adding Job Post',
          });
        }
      );
    } else {
      // Mark all form fields as touched to display validation errors
      this.jobForm.markAllAsTouched();
    }
  }
}
