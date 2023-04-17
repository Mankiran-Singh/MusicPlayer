import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Images } from 'src/app/files/constant';
import { environment, passwordsMatchValidatorOldPassword } from 'src/environments/environment';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/firestore';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { WindowService } from 'src/app/services/window.service';
import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  visible = true;
  changetype =true;
  url=Images.url
  viewpass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
  constructor(private router:Router,private window:WindowService){
     this.window.dataEmitter.subscribe((res)=>{
      console.log("==>",res);
     })
  }
  resetForm:any
  showErrors=false;
  ngOnInit(){
    this.resetForm=new FormGroup({
      newPassword:new FormControl('',[Validators.required]),
      oldPassword:new FormControl('',[Validators.required]),
      confirmPassword:new FormControl('',[Validators.required])
    },
    {validators:passwordsMatchValidatorOldPassword()});
  }
  reset(){
    if(this.resetForm.valid){
      console.log(this.resetForm.value);
      this.router.navigate(['login'])
    }
    else{
      this.showErrors=true;
    }
  }
  get newPassword(){
    return this.resetForm.get('newPassword')
  }
  
  get oldPassword(){
    return this.resetForm.get('oldPassword')
  }

  get confirmPassword(){
    return this.resetForm.get('confirmPassword')
  }
}
