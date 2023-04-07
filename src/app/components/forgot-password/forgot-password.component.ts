import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Images } from 'src/app/files/constant';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Router } from '@angular/router';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { WindowService } from 'src/app/services/window.service';
import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit{
  url1=Images.url
  windowRef:any;
  disableOtpSendButton=true;
  forgetPasswordForm=new FormGroup({
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
      callback: (response:any)=>{
        this.disableOtpSendButton=false
      }
   });
   this.windowRef.reCaptchaVerifier.render()
  }

  reCaptchaVerifier:any;
  showErrors=false
   sendOTP(){
    if(this.forgetPasswordForm.valid){
      const auth=getAuth()
       signInWithPhoneNumber(auth,"+91"+this.forgetPasswordForm.value.phoneNo,this.windowRef.reCaptchaVerifier).then((confirmationResult)=>{
          this.windowRef.confirmationResult=confirmationResult
          this.windowService.raiseDataEmitterEvent(this.windowRef.confirmationResult)
          localStorage.setItem('verificationId',confirmationResult.verificationId)
          this.router.navigate(['otp'])
        })
    }else{
      this.showErrors=true
    }
  }
  
  get phoneNo(){
    return this.forgetPasswordForm.get('phoneNo')
  }
}
