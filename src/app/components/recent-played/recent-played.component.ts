import { Component} from '@angular/core';
import { map } from 'rxjs';
import { Images } from 'src/app/files/constant';
import { FirebaseService } from 'src/app/services/firebase/firebase.service'
import { PlayPauseService } from 'src/app/services/playPause/play-pause.service';

@Component({
  selector: 'app-recent-played',
  templateUrl: './recent-played.component.html',
  styleUrls: ['./recent-played.component.scss']
})
export class RecentPlayedComponent{
  urlPlay=Images.urlPlay
  urlLike=Images.urlHeart;
  urlDislike=Images.urlDislike;
  urlPause=Images.urlPause
  newAudioArray:any = [];
  uniqueObject :any= {};
  constructor(private playPause:PlayPauseService,
    private fireService:FirebaseService){
    this.fireService.getRecentPlayed().pipe(map((res:any)=>{
      for(const key in res){
           this.playPause.audioArray.push(res[key])      
      }
    })).subscribe(()=>{
      for (const i in this.playPause.audioArray) {
        const objTitle = this.playPause.audioArray[i]['id'];
        this.uniqueObject[objTitle] = this.playPause.audioArray[i];
      }
      for (const i in this.uniqueObject){
        if(this.uniqueObject[i].amount==0){
          this.newAudioArray.push(this.uniqueObject[i]);
        }
      }
    })
  }
  audio=new Audio();
    
  playable=false;
  pauseAudio(j:any) { 
    this.audio.src=this.newAudioArray[j].url
    this.audio.pause();
    this.newAudioArray[j].play=true;
  } 

  play(j:any){
    this.audio.src=this.newAudioArray[j].url,
    this.audio.load()
    this.audio.play()
    this.newAudioArray[j].play=false;
    if(this.newAudioArray[j].play==false){
      for(let i=j+1;i<this.newAudioArray.length;i++)
      {
        this.newAudioArray[i].play= true;
      }
      for(let i=j-1;i>=0;i--)
      {
        this.newAudioArray[i].play= true;
      }
    }
  }
}


