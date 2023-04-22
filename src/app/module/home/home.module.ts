import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AudioComponent } from './audio/audio.component';
import { MatIconModule } from '@angular/material/icon';
import { FavoriteComponent } from './favorite/favorite.component';
import { RecentPlayedComponent } from './recent-played/recent-played.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SongsComponent } from './songs/songs.component';
import { MatDialogModule} from '@angular/material/dialog'
import { SpinnerComponent } from 'src/app/module/spinner/spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthRoutingModule } from '../auth/auth-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    AudioComponent,
    FavoriteComponent,
    RecentPlayedComponent,
    SongsComponent,SpinnerComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AuthRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgxSpinnerModule
  ]
})
export class HomeModule { }
