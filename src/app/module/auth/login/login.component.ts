import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Images } from 'src/app/files/constant';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { PlayPauseService } from 'src/app/services/playPause/play-pause.service';
import { EncrDecrService } from 'src/app/services/EncrDecr/encr-decr.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
   url=Images.url
   urlBackground=Images.urlBackground
   loginForm:any
    constructor(private router:Router,private encrDecr:EncrDecrService,
    private playPause:PlayPauseService,
    private authService:AuthService,
    private toastService:HotToastService){}
   
   ngOnInit(){
     this.loginForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.minLength(8)]),
     })
   }
   showErrors=false;
   encrypted:any;
   login(){
  //  this.encrypted=CryptoJS.AES.encrypt( this.loginForm.value.password, "mypassword").toString()
     if(this.loginForm.valid){
      //var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', encrypted);
       const {email,password}=this.loginForm.value
       this.authService.login(email,password).pipe(
        this.toastService.observe({
          success:"Logged In Successfully...",
          loading:"Logging In...",
          error:"There was an error...!"
        })
       ).subscribe((res)=>{
          localStorage.setItem('accessToken',res.user.refreshToken)
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
    this.router.navigate(['auth/signup'])
   }

   visible= true;
   changetype=true;
 
   viewpass(){
     this.visible = !this.visible;
     this.changetype = !this.changetype;
   }
}