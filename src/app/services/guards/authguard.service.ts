import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {
  constructor(private router:Router) { }
  canActivate(): boolean  {
    
    const token1=localStorage.getItem('accessToken');
    const token2=localStorage.getItem('verificationId');
    if(token1 || token2)
    {
      this.router.navigate(['/home/home']);
      return false;
    }
    else
    {
      return true;
    }
  }
}
