import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Images } from 'src/app/files/constant';
import { AuthService } from 'src/app/services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
   url=Images.url
   urlBackground=Images.urlBackground
   loginForm:any
   constructor(private router:Router,private authService:AuthService,private toastService:HotToastService){}
   
   ngOnInit(){
     this.loginForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required]),
     })
   }
   showErrors=false;
   login(){
     if(this.loginForm.valid){
       const {email,password}=this.loginForm.value
       this.authService.login(email,password).pipe(
        this.toastService.observe({
          success:"Logged In Successfully..",
          loading:"Logging In...",
          error:"There was an error...!"
        })
       ).subscribe(()=>{
         this.router.navigate(['home'])
       })
     }else{
      this.showErrors=true
     }
   }
   get email(){
    return this.loginForm.get('email')
   }
   get password(){
    return this.loginForm.get('password')
   }
   goToSignUp(){
    this.router.navigate(['signup'])
   }
   visible:boolean = true;
   changetype:boolean =true;
 
   viewpass(){
     this.visible = !this.visible;
     this.changetype = !this.changetype;
   }
   
}
