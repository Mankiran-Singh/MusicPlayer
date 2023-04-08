import { Component, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Images } from 'src/app/files/constant';
import { WindowService } from 'src/app/services/window.service';
import { environment } from 'src/environments/environment';
import firebase from 'firebase/compat/app';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent {
  url1=Images.url
  otpForm:any
  windowRef:any
  code = localStorage.getItem('verificationId') || ''
   
  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  @ViewChildren('formRow') rows: any;
  constructor(private windowService:WindowService,
     private router:Router) {
    this.otpForm = this.toFormGroup(this.formInput);
  }

  toFormGroup(elements:any) {
   const group: any = {};
   elements.forEach((key:any) => {
     group[key] = new FormControl('', Validators.required);
   });
   return new FormGroup(group);
  }

  stringOtp=''
  showErrors=false;
  verifyOtp(){
    if(this.otpForm.valid){
      for (const [key, value] of Object.entries(this.otpForm.value)) {
         this.stringOtp+=value
      }
      console.log(this.stringOtp)
      var credential = firebase.auth.PhoneAuthProvider.credential(this.code,this.stringOtp);
      firebase.auth().signInWithCredential(credential).then((res)=>{
        console.log(res)
        this.router.navigate(['home'])
      })
    }
    else{
      this.showErrors=true;
    }
  }
  get otp(){
    return this.otpForm.get('otp')    
  }
  keyUpEvent(event:any, index:any) {
    let pos = index;
    if (event.keyCode === 8 && event.which === 8) {  
     pos = index - 1 ;
    } else {
     pos = index + 1 ;
    }
    if (pos > -1 && pos < this.formInput.length ) {
     this.rows._results[pos].nativeElement.focus();
    }
  }

}
