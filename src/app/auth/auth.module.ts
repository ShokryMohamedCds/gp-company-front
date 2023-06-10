import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SendOtpFormComponent } from './send-otp-form/send-otp-form.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AuthComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    SendOtpFormComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    DatePipe,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule.forChild([{ path: '', component: SendOtpFormComponent }]),
    MatIconModule,
    MatListModule,
    MatSelectModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    DatePipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
  ],
  providers: [DatePipe],
  bootstrap: [LoginFormComponent],
})
export class AuthModule {}
