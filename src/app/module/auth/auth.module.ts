import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from 'src/app/module/auth/login/login.component';
import { OtpComponent } from './otp/otp.component';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { FloatingLabelModule } from '@progress/kendo-angular-label';
import { HotToastModule } from '@ngneat/hot-toast';


@NgModule({
  declarations: [
    LoginComponent,
    OtpComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AuthRoutingModule,
    FloatingLabelModule,
    HotToastModule.forRoot()
  ]
})
export class AuthModule { }
