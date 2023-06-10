import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-send-otp-form',
  templateUrl: './send-otp-form.component.html',
  styleUrls: ['./send-otp-form.component.css'],
})
export class SendOtpFormComponent implements OnInit {
  email: string = '';
  errors: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}
  sendOtpForm: FormGroup = this.fb.group({
    otp: ['', [Validators.required]],
  });

  ngOnInit() {
    this.email = this.route.snapshot.params['email'] || '';
  }
  sendEmail() {
    // get the email address from the form
    const otpControl = this.sendOtpForm.get('otp');
    const otp = otpControl ? otpControl.value : null;

    // create the request body
    const body = {
      email: this.email,
      OTP: otp,
    };

    // send the HTTP POST request to the backend
    this.http.post('http://localhost:8042/user/EnterOtp', body).subscribe(
      // success callback
      (response) => {
        this.router.navigate(['auth/login']);
        Swal.fire('Good job!', 'You Are Verfied Now!', 'success');
      },
      // error callback
      (error) => {
        alert(error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid OTP ',
        });
      }
    );
  }

  getEmailErrorMessage() {
    if (this.sendOtpForm.get('otp')!.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  onSubmit() {
    this.sendEmail(); // TODO: Send the OTP and email to the backend
  }
}
