import { Injectable } from '@angular/core';
import Swal from "sweetalert2";
import { FirebaseService } from '../firebase/firebase.service';
@Injectable({
  providedIn: 'root'
})
export class PlayPauseService {

     constructor(private fireService:FirebaseService) { }
     audioArray:any=[]
      audio=new Audio();
      pauseAudio(j:any){ 
        this.audio.src=this.audioArray[j].url
        this.audio.pause();
        this.audioArray[j].play=true;
      } 

    arrayPayment:any=[]
    play(j:any){
    if(this.arrayPayment[j]?.token==undefined && this.audioArray[j].amount!=0){
       this.sweetAlert2();
    }
    else{
      this.audio.src=this.audioArray[j].url,
      this.audio.load()
      this.audio.play()
      this.audioArray[j].play=false;
      if(this.audioArray[j].play==false){
          for(let i=j+1;i<this.audioArray.length;i++)
         {
           this.audioArray[i].play= true;
         }
          for(let i=j-1;i>=0;i--)
         {
           this.audioArray[i].play= true;
         }
       }
     }
    }
  
    sweetAlert2(){   
       Swal.fire({
       icon: 'error',
       title: 'Oops...',
       text: 'Please pay for it....!',
    })
  }

  sweetalert(){
    const Toast1 = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast1.fire({
      icon: 'success',
      title: 'Payment Successful'
     })
   }
   sweet(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'error',
      title: 'Please select mp3 type audio'
    })
    }

    sweetImage(){
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: 'Please select an image'
      })
      }

      sweetPrice(){
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: 'Enter valid price...'
        })
        }

    sweetAlertEmail(){
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: 'Email already exists...!'
      })
      }

    sweetAlert3(){
      Swal.fire({
        title: 'Audio Playing area is open...!',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    }

    sweetAlert4(){
      Swal.fire({
        title: 'Cannot open playing area audio is getting played...!',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    }

}