import { Component, ElementRef, EventEmitter, Input, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Images } from 'src/app/files/constant';
import { AuthService } from 'src/app/services/auth.service';
import { debounceTime, fromEvent, map } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MatDialog} from '@angular/material/dialog';
import { AddSongsComponent } from '../../add-songs/add-songs.component';
import { LoadingBarService } from '@ngx-loading-bar/core';
import Swal from 'sweetalert2';
import { DialogService } from 'src/app/services/dialog.service';
import {Storage, 
  ref, uploadBytesResumable,
  getDownloadURL} from '@angular/fire/storage';
import { arraySongs } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    
  ]
})
export class HomeComponent {
  url=Images.url
  urlPlay=Images.urlPlay
  user$=this.authService.currentUser$;
  urlLike=Images.urlHeart;
  urlDislike=Images.urlDislike;
  audioArray:any=[];
  urlPause=Images.urlPause
  idArray:any=[]
  token='';
  id:any=0;

  arrayPayment:any=[]
  constructor(public authService:AuthService,
    private loadingBar:LoadingBarService,
    private router:Router,
    private _dialog: MatDialog,
    private fireService:FirebaseService,
    public storage:Storage,
    private dialogService:DialogService){
        this.fireService.getPayment().pipe(map((res:any)=>{
          for(const key in res){
            if(res.hasOwnProperty(key)){
              this.token=res[key].token
              this.id=res[key].id
              this.arrayPayment.push({...res[key]})
            }
          }
        })).subscribe((res)=>{
        })
  }
  
  @ViewChild('myInput') myInput:any;
  ngOnInit(){
    console.log("OnInit called----")
    this.fireService.getAudio().pipe(map((res:any)=>{
      for(const key in res){
        if(res.hasOwnProperty(key)){
          this.audioArray.push({...res[key],'id':key})
        }
      }
    })).subscribe((res:any)=>{
    })
    this.invokeStripe(); 
  }

  reqData:any;
  audioSongsArray:any=[]

  ngAfterViewInit(){
    const search = fromEvent<any>(this.myInput.nativeElement,'keyup').pipe(
      map(event =>event.target.value),
         debounceTime(1000)
      )
     search.subscribe((res:any)=>{
        for(let i=0;i<this.audioArray.length;i++)
        {
          this.audioArray[i].name=this.audioArray[i].name.toLowerCase();
          //console.log("+++>",this.audioArray[i].amount)
           if(this.audioArray[i].name.includes(res.toLowerCase()))
           {
             this.reqData=this.audioArray[i].name
             this.audioSongsArray=this.audioArray[i]
           }
        }
        this.loadingBar.stop()
        setTimeout(()=>{
          this.reqData=null
        },2000)
      })
  }
  
  searchName='';
  showErrors=false;
  
  logOut(){
    this.authService.logOut().subscribe(()=>{
      localStorage.removeItem('verificationId')
      this.router.navigate(['login'])
    })
  }

  audio=new Audio();
    
  pauseAudio(j:any) { 
    this.audio.src=this.audioArray[j].url
    this.audio.pause();
    this.audioArray[j].play=true;
      this.fireService.postRecentlyPlayed(this.audioArray[j]).subscribe((res:any)=>{
      })
  } 

  // k=this.audioArray.length;
  play(j:any){
    if(this?.arrayPayment[j]?.token==undefined && this.audioArray[j].amount!=0){
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

  isOpen=false;
  toggleDialog(){
    this.isOpen = !this.isOpen;
  }

  open=true;
  openSongs(arraySongs:any){
    if(arraySongs.amount==0){
       this.authService.raiseDataEmitterEvent({'image':arraySongs.image,'url':arraySongs.url})
       this.open=false
    }else{
       this.sweetAlert2()
    }
  }

  urlSound=''
  showAudio=false;
  getAudio(j:any){
      this.audioArray[j].audioPlay=false
      this.urlSound=this.audioArray[j].url
      this.showAudio=true
  }
  
  public file:any={}
  chooseFile(event:any){
    this.file=event.target.files[0];
  }

  addImage=false;
  urlDownload:any;
  addedData=false;
  addData(file:any){
    this.amount=true;
    if(file.type=='audio/mpeg' && this.paymentArray[0].payment!=undefined || null){
      const storageRef=ref(this.storage,`mimify/${file.name}`)
      const uploadTask=uploadBytesResumable(storageRef,file);
      arraySongs.push(uploadTask)
      uploadTask.on('state_changed',
      (snapshot)=>{
        const progress=(snapshot.bytesTransferred / snapshot.totalBytes)
        console.log('upload is'+progress+'%done');
      },
      (error)=>{
         console.log(error.message)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURl)=>{
             this.fireService.postAudioUrl({'image':this.image,
             'like':true,'audioPlay':true,'showAudio':true,
             'play':true,'name':this.file.name,'songPlay':true,
             'type':this.file.type,'url':downloadURl,'liked':true,'premium':true,'amount':this.paymentArray[0].payment}).subscribe((res)=>{
              this.fireService.getAudio().pipe(map((res:any)=>{
                for(const key in res){
                  if(res.hasOwnProperty(key)){
                    this.audioArray.push({...res[key],'id':key})
                  }
                }
                this.addedData=true
              })).subscribe((res)=>{
        
              })
            })
        })
     })
    }else{
      this.sweet()
    }
  }

  image='';
  uploadImage(file:any){
    this.addImage=true;
    const storageRef=ref(this.storage,`mimify/${this.file.name}`)
    const uploadTask=uploadBytesResumable(storageRef,this.file);
    arraySongs.push(uploadTask)
    uploadTask.on('state_changed',
    (snapshot)=>{
      const progress=(snapshot.bytesTransferred / snapshot.totalBytes)
      console.log('upload is'+progress+'%done');
    },
    (error)=>{
       console.log(error.message)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURl)=>{
         this.image=downloadURl 
      })
   })
  }

  paymentArray:any=[]
  payForm=new FormGroup({
    payment: new FormControl('',[Validators.required])
  })

  amount=false;
  submitted=false;
  pay(){
    this.addImage=false;
    console.log(this.payForm.value)
    this.paymentArray.push(this.payForm.value)
    this.amount=true;
    this.submitted=true;
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

  sweetAlert2(){   
    Swal.fire({
     icon: 'error',
     title: 'Oops...',
     text: 'Please pay for it....!',
    })
  }

  like(audio:any,index:any,audioId:any){
    if(this?.arrayPayment[index]?.token==undefined && this.audioArray[index].amount!=0){
      this.sweetAlert2();
    }
    else{
    this.audioArray[index].like=false
    this.fireService.postAudioFavourite({'audio':audio,'audioLiked':this.audioArray[index].like,'index':index,'audioId':audioId}).subscribe((res)=>{
      this.fireService.putAudiourl(audio,audioId).subscribe((res)=>{
          console.log(res,"added to favorites")
      })
    })
   }
  }

  disLike(audio:any,index:any,audioId:any){
    this.audioArray[index].like=true
    this.fireService.putAudiourl(audio,audioId).subscribe((res)=>{
       this.fireService.deleteFavourites(audioId).subscribe((res)=>{
       }) 
    })
  }

  paymentHandler: any = null;
  makePayment(amount: any,j:any,audioId:any,audio:any) {
    const paymentHandler:any = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MwHzHSA3InbaajBmzfGEdDcnXtYOpKAqAfZxHIYAGIX02NB4irxV0gTTiJeDTwnDwYqWYeZi7DCYONPiz0kxTXp00qsLMBTFz',
      locale: 'auto',
      token: (stripeToken: any)=>{
        this.fireService.postPayment({'token':stripeToken.id,'id':j}).subscribe((res:any)=>{
           this.sweetalert();
           audio.amount=0;
           this.fireService.putAudiourl(audio,audioId).subscribe((res)=>{
                console.log(res)
           })
        })
      },
    });
    paymentHandler.open({
      name: 'Positronx',
      description: '3 widgets',
      amount: amount * 100,
    });
  }
  
  stripeToken:any;
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51MwHzHSA3InbaajBmzfGEdDcnXtYOpKAqAfZxHIYAGIX02NB4irxV0gTTiJeDTwnDwYqWYeZi7DCYONPiz0kxTXp00qsLMBTFz',
          locale: 'auto',
          token: function (stripeToken: any) {
            this.sweetalert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
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
}
