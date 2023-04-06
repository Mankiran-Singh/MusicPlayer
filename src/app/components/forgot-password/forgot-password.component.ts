import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Images } from 'src/app/files/constant';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  url1=Images.url
  forgetPasswordForm:any
  constructor(private router:Router){}
  ngOnInit(){
    this.forgetPasswordForm=new FormGroup({
      phoneNo:new FormControl('',[Validators.required])
    })
    firebase.initializeApp(environment.firebase)
  }

  reCaptchaVerifier:any;
  showErrors=false
  forgetPassword(){
    if(this.forgetPasswordForm.valid){
      const auth=getAuth();
      this.reCaptchaVerifier=new firebase.auth.RecaptchaVerifier('getotp',{
        'size':'normal'
      })

      firebase.auth().signInWithPhoneNumber(this.phoneNo,this.reCaptchaVerifier).then((confirmationResult:any)=>{
        console.log(confirmationResult)
      })
    }else{
      this.showErrors=true
    }
  }
  get phoneNo(){
    return this.forgetPasswordForm.get('phoneNo')
  }
}
