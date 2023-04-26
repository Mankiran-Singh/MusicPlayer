import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifyComponent } from 'src/app/module/auth/verify/verify.component';
import { OtpComponent } from './otp/otp.component';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { FloatingLabelModule } from '@progress/kendo-angular-label';
import { HotToastModule } from '@ngneat/hot-toast';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EncrDecrService } from 'src/app/services/EncrDecr/encr-decr.service';

@NgModule({
  declarations: [
    VerifyComponent,
    OtpComponent,
    AuthComponent,
    LoginComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AuthRoutingModule,
    FloatingLabelModule,
    HotToastModule.forRoot()
  ],
  providers:[EncrDecrService]
})
export class AuthModule { }
