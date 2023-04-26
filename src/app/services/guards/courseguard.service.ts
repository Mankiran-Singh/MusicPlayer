import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseguardService {
  constructor(private router:Router) { }
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    const token1=localStorage.getItem('accessToken')
    const token2=localStorage.getItem('verificationId')
    if(token1 || token2){
      return true;
    }
    else{
      this.router.navigate(['auth/login'])
      return false;
    }
   }  

}
