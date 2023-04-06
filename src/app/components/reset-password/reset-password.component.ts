import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Images } from 'src/app/files/constant';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  visible:boolean = true;
  changetype:boolean =true;
  url=Images.url
  viewpass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
  constructor(private router:Router){}
  resetForm:any
  showErrors=false;
  ngOnInit(){
    this.resetForm=new FormGroup({
      newPassword:new FormControl('',[Validators.required]),
      oldPassword:new FormControl('',[Validators.required]),
      confirmPassword:new FormControl('',[Validators.required])
    })
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
