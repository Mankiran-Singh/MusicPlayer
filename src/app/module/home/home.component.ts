import { Component,ElementRef,OnDestroy,OnInit,ViewChild} from '@angular/core';
import { Images } from 'src/app/files/constant';
import { AuthService } from 'src/app/services/auth/auth.service';
import { map } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase/firebase.service'
import { PlayPauseService} from 'src/app/services/playPause/play-pause.service'
import { DialogService } from 'src/app/services/events/dialog.service';
import { arraySongs } from 'src/environments/environment';
import { EncrDecrService } from 'src/app/services/EncrDecr/encr-decr.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  url=Images.url
  urlPlay=Images.urlPlay
  urlLike=Images.urlHeart;
  urlDislike=Images.urlDislike;
  urlPause=Images.urlPause
  idArray:any=[]
  token='';
  id=0;

  audioArraySongs=this.playPauseService.audioArray
  arrayPayment=this.playPauseService.arrayPayment

  constructor(public authService:AuthService,
      private playPauseService:PlayPauseService,
      private fireService:FirebaseService,private EncrDecr:EncrDecrService,
      private dialog:DialogService,private host: ElementRef<HTMLElement>){
        this.fireService.getPayment().pipe(map((res:any)=>{
          for(const key in res){
              this.token=res[key].token
              this.id=res[key].id
              this.playPauseService.arrayPayment.push({...res[key]})
          }
        })).subscribe()
      this.dialog.dataEmitter2.pipe(map((res:any)=>{
        for(const key in res){
            this.playPauseService.audioArray.push({...res[key],'id':key})
        }
      })).subscribe(()=>{
        //  this.playPauseService.audioArray.push(res) 
      })
  }
  
  @ViewChild('myInput') myInput:any;
  ngOnInit(){
    this.fireService.getAudio().pipe(map((res:any)=>{
      for(const key in res){
          this.playPauseService.audioArray.push({...res[key],'id':key})
      }
    })).subscribe(); 
    this.invokeStripe(); 
  }

  urlSound=''
  showAudio=false;
  getAudio(j:any){
      if(this.audioArraySongs[j].amount==0){
        this.index=j;
        this.playPauseService.audioArray[this.index].audioPlay=false
        this.urlSound=this.playPauseService.audioArray[this.index].url
        this.showAudio=!this.showAudio
       // this.playPauseService.audioArray[this.index].play=true
      }
      else{
        this.playPauseService.sweetAlert2()
      }
  }

  audio=new Audio(); 
  playable=false;
  pauseAudio(j:any) { 
   // console.log("==>"+this.playPauseService.audioArray[j].url)
    this.audio.src=this.playPauseService.audioArray[j].url
    this.audio.pause();
    this.playPauseService.audioArray[j].play=true;
  } 
  play(j:any){
    //console.log(this.playPauseService.audioArray[j].url)
    if(this.playPauseService.audioArray[j].amount==0){
      this.audio.src=this.playPauseService.audioArray[j].url,
    this.audio.load()
    this.audio.play()
    this.playPauseService.audioArray[j].play=false;
    if(this.playPauseService.audioArray[j].play==false){
      for(let i=j+1;i<this.playPauseService.audioArray.length;i++)
      {
        this.playPauseService.audioArray[i].play= true;
      }
      for(let i=j-1;i>=0;i--)
      {
        this.playPauseService.audioArray[i].play= true;
      }
    }
    if(this.showDiv==true){
      for(let i=0;i<this.playPauseService.audioArray.length;i++)
      {
         this.pauseAudio(i)
      }
      this.playPauseService.sweetAlert3();
    }
    }else{
      this.playPauseService.sweetAlert2()
    }
  }

  like(audio:any,index:any,audioId:any){
    if(this.playPauseService.arrayPayment[index]?.token==undefined && this.playPauseService.audioArray[index].amount!=0){
      this.playPauseService.sweetAlert2();
    }
    else{
    this.playPauseService.audioArray[index].like=false
    this.fireService.postAudioFavourite({'audio':audio,'audioLiked':this.playPauseService.audioArray[index].like,'index':index,'audioId':audioId}).subscribe(()=>{
      this.fireService.putAudiourl(audio,audioId).subscribe()
    })
   }
  }

  disLike(audio:any,index:any,audioId:any){
    this.playPauseService.audioArray[index].like=true
    this.fireService.putAudiourl(audio,audioId).subscribe(()=>{
       this.fireService.deleteFavourites(audioId).subscribe() 
    })
  }

  paymentHandler: any = null;
  makePayment(amount: any,j:any,audioId:any,audio:any) {
    const paymentHandler:any = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MwHzHSA3InbaajBmzfGEdDcnXtYOpKAqAfZxHIYAGIX02NB4irxV0gTTiJeDTwnDwYqWYeZi7DCYONPiz0kxTXp00qsLMBTFz',
      locale: 'auto',
      token: (stripeToken: any)=>{
        this.fireService.postPayment({'token':stripeToken.id,'id':j}).subscribe(()=>{
            this.playPauseService.sweetalert();
            audio.amount=0;
            this.fireService.putAudiourl(audio,audioId).subscribe()
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
          token: function () {
            this.playPauseService.sweetalert();
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
   index:any;
   showDiv=false;
   showDivAppSong(j:any){
      this.showDiv=!this.showDiv
      for(const i in this.playPauseService.audioArray){
        if(this.playPauseService.audioArray[i].play==false){
          this.playPauseService.sweetAlert4();
          this.showDiv=false
        }
      }
      if(!this.showDiv){
        this.dialog.raiseDataEmitterEvent3(j)
      }
   }
}
