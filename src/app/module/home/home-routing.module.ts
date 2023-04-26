import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { RecentPlayedComponent } from './recent-played/recent-played.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { CourseguardService } from 'src/app/services/guards/courseguard.service';
import { NoPageComponent } from '../no-page/no-page.component';

const routes: Routes = [
   {path:'',redirectTo:'home',pathMatch:'full'},
   {path:'home',component:HomeComponent,canActivate:[CourseguardService]},
   {path:'favorite',component:FavoriteComponent},
   {path:'recent',component:RecentPlayedComponent},
   {path:'**',component:NoPageComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
