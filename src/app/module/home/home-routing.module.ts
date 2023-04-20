import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { RecentPlayedComponent } from './recent-played/recent-played.component';
import { FavoriteComponent } from './favorite/favorite.component';

const routes: Routes = [
   {path:'',redirectTo:'home',pathMatch:'full'},
   {path:'home',component:HomeComponent,
  children:[
    {path:'favorite',component:FavoriteComponent},
    {path:'recent',component:RecentPlayedComponent}
  ]},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
