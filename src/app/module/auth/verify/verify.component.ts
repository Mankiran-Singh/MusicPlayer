import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { DialogService } from 'src/app/services/events/dialog.service';
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit{
  url1=Images.url
  windowRef:any;
  disableOtpSendButton=true;
  verifyForm=new FormGroup({
     phoneNo:new FormControl('',[Validators.required])
  })
  constructor(private router:Router,private dialog:DialogService,
    private windowService:WindowService,
    private authService:AuthService,
    private auth:Auth,private fb:FormBuilder){
    firebase.initializeApp(environment.firebase)
    this.dialog.dataEmitter4.subscribe((res:any)=>{
      console.log(res)
       this.verifyForm.setValue({
         phoneNo:res
       })
    })
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
    if(this.verifyForm.valid){
      const auth=getAuth()
       signInWithPhoneNumber(auth,"+91"+this.verifyForm.value.phoneNo,this.windowRef.reCaptchaVerifier).then((confirmationResult)=>{
          this.windowRef.confirmationResult=confirmationResult
          localStorage.setItem('verificationId',confirmationResult.verificationId)
          this.router.navigate(['auth/otp'])
        })
    }else{
      this.showErrors=true
    }
  }
  
  get phoneNo(){
    return this.verifyForm.get('phoneNo')
  }

  signUp(){
    this.router.navigate(['auth/signup'])
  }
   
}
