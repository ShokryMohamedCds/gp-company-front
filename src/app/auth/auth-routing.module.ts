import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { SendOtpFormComponent } from './send-otp-form/send-otp-form.component';

const routes: Routes = [{ path: '', component: LoginFormComponent,pathMatch: 'full' },{ path: 'login', component: LoginFormComponent },{ path: 'register', component: RegistrationFormComponent },  { path: 'sendotp/:email', component: SendOtpFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
