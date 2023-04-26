import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyComponent } from './verify/verify.component';
import { OtpComponent } from './otp/otp.component';
import { AuthComponent } from './auth.component';
import { AuthguardService } from 'src/app/services/guards/authguard.service';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NoPageComponent } from '../no-page/no-page.component';

const routes: Routes = [ 
   {path:'',redirectTo:'signup',pathMatch:'full'},
   {path:'signup',component:AuthComponent,canActivate:[AuthguardService]},
   {path:'verify',component:VerifyComponent},
   {path:'login',component:LoginComponent,canActivate:[AuthguardService]},
   {path:'otp',component:OtpComponent},
   {path:'forget',component:ForgotPasswordComponent},
   {path:'**',component:NoPageComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }