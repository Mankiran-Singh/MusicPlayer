import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {
  constructor(private router:Router) { }
  canActivate(): boolean  {
    
    const token=localStorage.getItem('verificationId');
    if(token)
    {
      this.router.navigate(['home']);
      return false;
    }
    else
    {
      return true;
    }
  }
}
