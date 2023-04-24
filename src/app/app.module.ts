import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import {MatIconModule} from '@angular/material/icon'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatInputModule} from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth/auth.service';
import { provideAuth,getAuth, AuthModule } from '@angular/fire/auth';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore'
import {provideStorage,getStorage} from '@angular/fire/storage'
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SafePipeModule } from 'safe-pipe';
import { MaterialModule } from './material.module';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog'
import { LoadingBarModule } from '@ngx-loading-bar/core';
import {AngularFireModule} from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { WindowService } from 'src/app/services/recaptcha/window.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CourseguardService } from './services/guards/courseguard.service';
import { AuthguardService } from './services/guards/authguard.service';

@NgModule({
  declarations: [
    AppComponent,
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SweetAlert2Module,
    AppRoutingModule,
    NgbModule,
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
    AngularFirestoreModule,
  ],
    providers: [FirebaseService,
    AuthService,WindowService,Storage,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},CourseguardService,
    AuthguardService],
    bootstrap: [AppComponent]
})
export class AppModule { }
