import {Injectable} from '@angular/core';
import {Auth, authState} from '@angular/fire/auth';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { from,switchMap} from 'rxjs';
import { PlayPauseService } from '../playPause/play-pause.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$ =authState(this.auth);

  constructor(private auth:Auth,private playPause:PlayPauseService,
    private router:Router,private fireAuth:AngularFireAuth) { }

  login(email:string,password:string){
   return from(signInWithEmailAndPassword(this.auth,email,password))
  }

  logOut(){
    return from(this.auth.signOut())
  }

  signUp(name:string,email:string,password:string){
    return from(createUserWithEmailAndPassword(this.auth,email,password)).pipe(
      switchMap(({user}) => updateProfile(user,{displayName:name})))
  }

   forgotPassword(email:any){
      this.fireAuth.sendPasswordResetEmail(email).then(()=>{
         this.router.navigate(['auth/login'])
      },err=>{
         alert('something went wrong')
      })
   }

}
