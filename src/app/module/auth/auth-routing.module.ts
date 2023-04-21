import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { AuthComponent } from './auth.component';
import { AuthguardService } from 'src/app/services/guards/authguard.service';
const routes: Routes = [ 
   {path:'',redirectTo:'signup',pathMatch:'full'},
   {path:'signup',component:AuthComponent,canActivate:[AuthguardService]},
   {path:'login',component:LoginComponent,canActivate:[AuthguardService]},
   {path:'otp',component:OtpComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }