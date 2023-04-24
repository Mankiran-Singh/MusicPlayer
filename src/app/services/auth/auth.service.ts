import { EventEmitter, Injectable} from '@angular/core';
import {Auth, authState} from '@angular/fire/auth';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Observable, from, map, of, switchMap, timer } from 'rxjs';
import { PlayPauseService } from '../playPause/play-pause.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$ =authState(this.auth);

  constructor(private auth:Auth,private playPause:PlayPauseService) { }
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

  public searchEmailAddress(emailAddress: string): Observable<Array<string>> {
    //console.log(`searchUser >> emailAddress = ${emailAddress}`);

    if (emailAddress) {
        // debounce
        return timer(1000)  // wait 1 second before searching to reduce API requests
            .pipe(
                switchMap(() => {
                    return from(fetchSignInMethodsForEmail(this.auth, emailAddress));
                })
            );
    } else {
        return of([]);
    }
}

public emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<any> => {
        return this.searchEmailAddress(control.value)
            .pipe(
                map((res: Array<string>) => {
                    console.log(res);
                    // if sign-in methods exist for the email address, it is used
                    if (res.length) {
                        // return error
                        this.playPause.sweetAlertEmail()
                        return { emailExists: true };
                        
                    } else {
                        return null;
                    }
                })
            );
    };
}

}
