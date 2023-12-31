import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from './services/guards/authguard.service';
import { CourseguardService } from './services/guards/courseguard.service';
import { NoPageComponent } from './module/no-page/no-page.component';

const routes: Routes = [
  {path:'',redirectTo:'auth',pathMatch:'full'},

  {path:'home',canActivate:[CourseguardService],
  loadChildren: () => import('src/app/module/home/home.module').then(m => m.HomeModule)},

  {path:'auth',canActivate:[AuthguardService],
  loadChildren: () => import('src/app/module/auth/auth.module').then(m => m.AuthModule)},

  {path:'**',component:NoPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
