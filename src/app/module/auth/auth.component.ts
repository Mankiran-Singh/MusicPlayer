import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Images } from 'src/app/files/constant';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';
import { PlayPauseService } from 'src/app/services/playPause/play-pause.service';
import { DialogService } from 'src/app/services/events/dialog.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{
  url=Images.url
  urlBackground=Images.urlBackground
  signUpForm:any

  constructor(private router:Router,
      private dialog:DialogService,private authService:AuthService,private toast:HotToastService,private playPause:PlayPauseService){}
  
  ngOnInit(){
    this.signUpForm=new FormGroup({
      name:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required]),
      phoneNo:new FormControl('',[Validators.required]),
     }
    );
  }
 
  showErrors=false;
  signUp(){
    if(this.signUpForm.valid){
      this.dialog.raiseDataEmitterEvent4(this.signUpForm.value.phoneNo)
      const {name,email,password}=this.signUpForm.value;
      this.authService.signUp(name,email,password).pipe(
        this.toast.observe({
          loading: 'Please wait...',
          success: 'SignUp successful!',
          error: 'Either email already exists or Form is invalid',
        })
      ).subscribe(()=>{
           this.router.navigate(['auth/verify'])       
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
    this.router.navigate(['auth/login'])
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
