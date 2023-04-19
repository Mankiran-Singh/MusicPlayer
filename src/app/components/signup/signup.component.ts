import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Images } from 'src/app/files/constant';
import { AuthService } from 'src/app/services/auth/auth.service';
import {passwordsMatchValidator } from 'src/app/files/passwordMatch';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
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
      phoneNo:new FormControl('',[Validators.required]),
      file:new FormControl('',[Validators.required]),
      fileSource: new FormControl('', [Validators.required])
    },
    {validators:passwordsMatchValidator()});
  }
 
  showErrors=false;
  signUp(){
    if(this.signUpForm.valid){
      const formData = new FormData();

      formData.append('file', this.signUpForm.get('fileSource').value);
      console.log(this.signUpForm.value)
      const {name,email,password}=this.signUpForm.value;
      this.authService.signUp(name,email,password).pipe(
        this.toast.observe({
        })
      ).subscribe(()=>{
        this.router.navigate(['home'])
        this.sweetAlert();
      })
    }else{
      this.showErrors=true;
    }
  }

  onFileChange(event:any) {
     if (event.target.files.length > 0){
      const file = event.target.files[0];
      this.signUpForm.patchValue({
        fileSource: file
      });
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
  get file(){
    return this.signUpForm.get('file')
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
  sweetAlert(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'SignUp Successful',
      showConfirmButton: false,
      timer: 1500,
      width:'400px',
    })
  }
}
