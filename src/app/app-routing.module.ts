import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSongsComponent } from './components/add-songs/add-songs.component';
import { HomeComponent } from './components/components/home/home.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { OtpComponent } from './components/otp/otp.component';
import { RecentPlayedComponent } from './components/recent-played/recent-played.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SignupComponent } from './components/signup/signup.component';
import { SongsComponent } from './components/songs/songs.component';
import { AuthguardService } from './services/authguard.service';
import { CourseguardService } from './services/courseguard.service';

const routes: Routes = [
  {path:'',redirectTo:'signup',pathMatch:'full'},
  {path:'login',component:LoginComponent,},
  {path:'signup',component:SignupComponent,},
  {path:'forgotpassword',component:ForgotPasswordComponent},
  {path:'reset',component:ResetPasswordComponent},
  {path:'home',component:HomeComponent,},
  {path:'addsongs',component:AddSongsComponent},
  {path:'songs',component:SongsComponent},
  {path:'otp',component:OtpComponent},
  {path:'favorite',component:FavoriteComponent},
  {path:'recent',component:RecentPlayedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
