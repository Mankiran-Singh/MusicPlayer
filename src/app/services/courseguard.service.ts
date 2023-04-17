import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseguardService {
  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    const token=localStorage.getItem('verificationId')
    if(token){
      return true;
    }
    else{
      this.router.navigate(['login'])
      return false;
    }
   }  
}
