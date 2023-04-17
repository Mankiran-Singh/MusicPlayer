import { Component } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Images } from 'src/app/files/constant';
import { AuthService } from 'src/app/services/auth.service';
import { passwordsDontMatch,passwordsMatchValidator } from 'src/environments/environment';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  url=Images.url
  urlBackground=Images.urlBackground
  signUpForm:any
  constructor(private router:Router,private authService:AuthService,private toast:HotToastService){
     console.log(getAuth())
  }
  ngOnInit(){
    this.signUpForm=new FormGroup({
      name:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required]),
      confirmPassword:new FormControl('',[Validators.required]),
      phoneNo:new FormControl('',[Validators.required])
    },
    {validators:passwordsMatchValidator()});
  }
 
  showErrors=false;
  signUp(){
    if(this.signUpForm.valid){
      const {name,email,password}=this.signUpForm.value;
      this.authService.signUp(name,email,password).pipe(
        this.toast.observe({
           success: 'Congrats! You are signed Up',
           loading:'Signing Up... PLease Wait..',
        })
      ).subscribe(()=>{
        this.router.navigate(['home'])
      })
    }else{
      this.showErrors=true;
    }
  }
  get name(){
    return this.signUpForm.get('name')
  }
  get email(){
    return this.signUpForm.get('email')
  }
  get password(){
    return this.signUpForm.get('password')
  }
  get confirmPassword(){
    return this.signUpForm.get('confirmPassword')
  }
  get phoneNo(){
    return this.signUpForm.get('phoneNo')
  }
  goToLogin(){
    this.router.navigate(['login'])
  }
  visible = true;
  changetype =true;

  viewpass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
}
