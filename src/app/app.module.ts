import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { HomeComponent } from './components/components/home/home.component';
import { FirebaseService } from './services/firebase.service';
import { InterceptorsService } from './services/interceptors.service';
import {MatIconModule} from '@angular/material/icon'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatInputModule} from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import { AddSongsComponent } from './components/add-songs/add-songs.component'
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore'
import {provideStorage,getStorage} from '@angular/fire/storage'
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SafePipeModule } from 'safe-pipe';
import { MaterialModule } from './material.module';
import {MatDialogModule} from '@angular/material/dialog'
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { SongsComponent } from './components/songs/songs.component';
import { OtpComponent } from './components/otp/otp.component';
import {AngularFireModule} from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { WindowService } from './services/window.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    HomeComponent,
    AddSongsComponent,
    SongsComponent,
    OtpComponent
  ],
  imports: [
    BrowserModule,
    SweetAlert2Module,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    HttpClientModule,
    SafePipeModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(()=>getFirestore()),
    provideStorage(()=> getStorage()),
    MaterialModule,
    MatDialogModule,
    LoadingBarModule,
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFireAuthModule,    
    AngularFirestoreModule 
  ],
  providers: [FirebaseService,InterceptorsService,AuthService,WindowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
