import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSongsComponent } from './components/add-songs/add-songs.component';
import { HomeComponent } from './components/components/home/home.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SignupComponent } from './components/signup/signup.component';
import { SongsComponent } from './components/songs/songs.component';

const routes: Routes = [
  {path:'',redirectTo:'signup',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'forgotpassword',component:ForgotPasswordComponent},
  {path:'reset',component:ResetPasswordComponent},
  {path:'home',component:HomeComponent},
  {path:'addsongs',component:AddSongsComponent},
  {path:'songs',component:SongsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
