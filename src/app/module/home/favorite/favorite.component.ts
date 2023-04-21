import { Component } from '@angular/core';
import { map } from 'rxjs';
import { Images } from 'src/app/files/constant';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DialogService } from 'src/app/services/events/dialog.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service'
import { PlayPauseService } from 'src/app/services/playPause/play-pause.service';
@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent{
  urlPlay=Images.urlPlay
  audioArray:any=[];
  urlPause=Images.urlPause
  urlLike=Images.urlHeart
  urlDislike=Images.urlDislike
  
  constructor(private fireService:FirebaseService,
    private authService:AuthService,
    private dialog:DialogService,private playPauseService:PlayPauseService){
    this.fireService.getAudioFavourite().pipe(map((res:any)=>{
      for(const key in res){
          const array:any=Object.values(res[key])
          console.log(array[0].audio)
          this.audioArray.push(array[0].audio)        
        }
    })).subscribe()
  }
  index:any;
  audio=new Audio(); 
  getAudio(j:any){
    if(this.audioArray[j].amount==0){
      this.index=j;
      this.audioArray[this.index].audioPlay=false
      this.urlSound=this.audioArray[this.index].url
      // this.showAudio=!this.showAudio
     // this.playPauseService.audioArray[this.index].play=true
    }
    else{
      this.playPauseService.sweetAlert2()
    }
}

  playable=false;
  pauseAudio(j:any) { 
    console.log("==>"+this.audioArray[j].res.url)
    this.audio.src=this.audioArray[j].url
    this.audio.pause();
    this.audioArray[j].play=true;
  } 
  play(j:any){
    console.log(this.audioArray[j].url)
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

  urlSound=''
  // getAudio(j:any){
  //     this.audioArray[j].audioPlay=false
  //     this.urlSound=this.audioArray[j].url
  //     this.audioArray[j].showAudio = !this.audioArray[j].showAudio;
  // }

  like(j:any){
    this.audioArray[j].like=false;
  }

  disLike(audio:any,audioid:any,j:any){
    console.log("===>",audioid)
    this.audioArray[j].like=true
    this.fireService.deleteFavourites(audioid).subscribe(()=>{
      this.fireService.putAudiourl(audio,audio.id).subscribe(()=>{
      })
    })
  }

  open=true;
  openSongs(arraySongs:any){
    this.dialog.raiseDataEmitterEvent(arraySongs)
    this.open=!this.open
  }
}