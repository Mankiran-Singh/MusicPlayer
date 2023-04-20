import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { AuthComponent } from './auth.component';
const routes: Routes = [ 
   {path:'',redirectTo:'signup',pathMatch:'full'},
   {path:'signup',component:AuthComponent},
   {path:'login',component:LoginComponent},
   {path:'otp',component:OtpComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }