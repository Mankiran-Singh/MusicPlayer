import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './module/home/home.component';
// import { AuthguardService } from './services/guards/authguard.service';
// import { CourseguardService } from './services/guards/courseguard.service';
// import { AuthComponent } from './module/auth/auth.component';

const routes: Routes = [
  {path:'',redirectTo:'auth',pathMatch:'full'},
  {path:'home',
  loadChildren: () => import('src/app/module/home/home.module').then(m => m.HomeModule)},

  {path:'auth',
  loadChildren: () => import('src/app/module/auth/auth.module').then(m => m.AuthModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
