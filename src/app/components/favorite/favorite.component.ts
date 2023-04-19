import { Component } from '@angular/core';
import { map } from 'rxjs';
import { Images } from 'src/app/files/constant';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DialogService } from 'src/app/services/events/dialog.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service'
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
    private dialog:DialogService){
    this.fireService.getAudioFavourite().pipe(map((res:any)=>{
      for(const key in res){
          const array:any=Object.values(res[key])
          this.audioArray.push({'res':array[0].audio,'index':array[0].index,'id':key})        
      }
    })).subscribe()
  }

  audio=new Audio(); 
  playable=false;
  pauseAudio(j:any) { 
    console.log("==>"+this.audioArray[j].res.url)
    this.audio.src=this.audioArray[j].res.url
    this.audio.pause();
    this.audioArray[j].res.play=true;
  } 
  play(j:any){
    console.log(this.audioArray[j].res.url)
    this.audio.src=this.audioArray[j].res.url,
    this.audio.load()
    this.audio.play()
    this.audioArray[j].res.play=false;
    if(this.audioArray[j].res.play==false){
      for(let i=j+1;i<this.audioArray.length;i++)
      {
        this.audioArray[i].res.play= true;
      }
      for(let i=j-1;i>=0;i--)
      {
        this.audioArray[i].res.play= true;
      }
    }
  }

  urlSound=''
  getAudio(j:any){
      this.audioArray[j].audioPlay=false
      this.urlSound=this.audioArray[j].url
      this.audioArray[j].showAudio = !this.audioArray[j].showAudio;
  }

  like(j:any){
    this.audioArray[j].res.like=false;
  }

  disLike(audio:any,audioid:any,j:any){
    console.log("===>",audioid)
    this.audioArray[j].res.like=true
    this.fireService.deleteFavourites(audioid)
    .subscribe(()=>{
      this.fireService.putAudiourl(audio.res,audio.res.id).subscribe((res)=>{
        console.log(res)
      })
    })
  }

  open=true;
  openSongs(arraySongs:any){
    this.dialog.raiseDataEmitterEvent(arraySongs)
    this.open=!this.open
  }
}