import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Images } from 'src/app/files/constant';
import { AuthService } from 'src/app/services/auth/auth.service';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/firestore';
import { getAuth,signInWithPhoneNumber } from 'firebase/auth';
import { WindowService } from 'src/app/services/recaptcha/window.service';
import { Auth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  url1=Images.url
  windowRef:any;
  disableOtpSendButton=true;
  loginForm=new FormGroup({
    phoneNo:new FormControl('',[Validators.required])
  })
  constructor(private router:Router,
    private windowService:WindowService,
    private authService:AuthService,
    private auth:Auth){
    firebase.initializeApp(environment.firebase)
  }
  ngOnInit(){
    this.windowRef=this.windowService.windowRef
    this.windowRef.reCaptchaVerifier=new firebase.auth.RecaptchaVerifier('recaptcha-container',{
      size:'normal',
      callback: ()=>{
        this.disableOtpSendButton=false
      }
   });
   this.windowRef.reCaptchaVerifier.render()
  }

  reCaptchaVerifier:any;
  showErrors=false
   sendOTP(){
    if(this.loginForm.valid){
      const auth=getAuth()
       signInWithPhoneNumber(auth,"+91"+this.loginForm.value.phoneNo,this.windowRef.reCaptchaVerifier).then((confirmationResult)=>{
          this.windowRef.confirmationResult=confirmationResult
          localStorage.setItem('verificationId',confirmationResult.verificationId)
          this.router.navigate(['auth/otp'])
        })
    }else{
      this.showErrors=true
    }
  }
  
  get phoneNo(){
    return this.loginForm.get('phoneNo')
  }

  signUp(){
    this.router.navigate(['auth/signup'])
  }
   
}
