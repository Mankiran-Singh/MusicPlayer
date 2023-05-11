import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Images } from 'src/app/files/constant';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Router } from '@angular/router';
import { WindowService } from 'src/app/services/recaptcha/window.service';
import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit{
  url1=Images.url
  windowRef:any;

  forgetPasswordForm:any;
  ngOnInit(){
    this.forgetPasswordForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email])
    })
  }
  constructor(private router:Router,
    private windowService:WindowService,
    private authService:AuthService,
    private auth:Auth){
    firebase.initializeApp(environment.firebase)
  }

  reCaptchaVerifier:any;
  showErrors=false
   sendVerificationEmail(){
    if(this.forgetPasswordForm.valid){
       this.authService.forgotPassword(this.forgetPasswordForm.value.email)
    }else{
      this.showErrors=true
    }
  }
  
  get email(){
    return this.forgetPasswordForm.get('email')
  }
}
