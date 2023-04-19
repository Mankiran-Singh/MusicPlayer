import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/components/home/home.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { LoginComponent } from './components/login/login.component';
import { OtpComponent } from './components/otp/otp.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecentPlayedComponent } from './components/recent-played/recent-played.component';
import { SignupComponent } from './components/signup/signup.component';
import { SongsComponent } from './components/songs/songs.component';
import { AuthguardService } from './services/guards/authguard.service';
import { CourseguardService } from './services/guards/courseguard.service';

const routes: Routes = [
  {path:'',redirectTo:'signup',pathMatch:'full'},
  {path:'login',component:LoginComponent,canActivate:[AuthguardService]},
  {path:'signup',component:SignupComponent,canActivate:[AuthguardService]},
  {path:'home',component:HomeComponent,canActivate:[CourseguardService],
  children: [
    {path:'favorite',component:FavoriteComponent},
    {path:'recent',component:RecentPlayedComponent},
    {path:'profile',component:ProfileComponent},
  ]},
  {path:'songs',component:SongsComponent},
  {path:'otp',component:OtpComponent,canActivate:[CourseguardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
