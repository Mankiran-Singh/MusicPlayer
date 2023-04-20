import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Images } from 'src/app/files/constant';
import * as moment from 'moment';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { PlayPauseService } from 'src/app/services/playPause/play-pause.service';
@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit{

  urlBackground=Images.urlImage
  urlPlay=Images.urlPlay;
  urlPause=Images.urlPause;
  urlNextSong=Images.nextSong;
  urlPreviousSong=Images.previousSong;

  @Input() arraySongs:any=[]
  @Input() index:any;
  @Input() audioPlay:any

  songPlayer:any={}
  constructor(private fireService:FirebaseService,private playPause:PlayPauseService){}
  audioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ];
   ind:any=0;
   audioPlayable=false;
  ngOnInit(){
     this.ind=this.index;
     this.songPlayer=this.arraySongs[this.index]
     this?.play(this.index)
     this.arraySongs[this.index].play=true;
     this.fireService.postRecentlyPlayed(this.arraySongs[this.index]).subscribe()
  }

  audio=new Audio();
  playable=false;
  pauseAudio(j:any) { 
    this.audio.src=this.arraySongs[j]?.url
    this.audio.pause();
    this.arraySongs[j].songPlay=true;
  } 
  
  currentTime:any=0;
  duration:any=0;
  seek:any=0;
  play(j:any){
    if(this.arraySongs[j]?.amount>0){
     this.playPause.sweetAlert2();
    }
    else{
     this.arraySongs[j].songPlay=false;
     this.streamObserver(this.arraySongs[j]?.url).subscribe(()=>{
     })
    }
  }
  
  hide=false;
  hideContainer(j:any){
    this.pauseAudio(j);
     this.hide=true;
  }
 
  setVolume(event:any){
    this.audio.volume=event.target.value
  }

  setSeekTo(event:any){
    this.audio.volume=event.target.value
  }
   
  streamObserver(url:any){
    return new Observable(()=>{
      this.audio.src=url
      this.audio.load();
      this.audio.play();
      const handler= ()=>{
        this.seek=this.audio.currentTime
        this.duration=this.formatTime(this.audio.duration)
        this.currentTime=this.formatTime(this.audio.currentTime)
      }
      this.addEvent(this.audio,this.audioEvents,handler);

      return ()=>{
        this.audio.pause();
        this.audio.currentTime=0;
        this.removeEvent(this.audio,this.audioEvents,handler)
      }
    })
  }

  addEvent(obj:any, events:any,handler:any){
      events.forEach((event:any) => {
         obj.addEventListener(event,handler)
      });
  }

  removeEvent(obj:any, events:any,handler:any){
    events.forEach((event:any) => {
      obj.removeEventListener(event,handler)
   });
  }

  formatTime(time: number, format = "HH:mm:ss") {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }
 
  nextSong(j:any){
      this.songPlayer=this.arraySongs[(j+1)%this.arraySongs.length] 
      this.pauseAudio(j);
      this.arraySongs[j].play=true
      this.ind=(j+1)%this.arraySongs.length
      if(this.arraySongs[this.ind].amount>0){
        this.playPause.sweetAlert2();
      }else{
       this.play(this.ind);
       this.arraySongs[this.ind].play=false;
       this.arraySongs[this.ind].play=true;
       this.fireService.postRecentlyPlayed(this.arraySongs[this.ind]).subscribe()
      }
    }

  previousSong(j:any){
    this.songPlayer=this.arraySongs[(j-1)] 
    this.pauseAudio(j);
    this.arraySongs[j].play=true
    this.ind=(j-1)
    if(j-1<0){
      this.songPlayer=this.arraySongs[this.arraySongs.length-1]
      this.ind=this.arraySongs.length-1
    }
    if(this.arraySongs[this.ind].amount>0){
      this.playPause.sweetAlert2();
    }else{
     this.play(this.ind);
     this.arraySongs[this.ind].play=false;
     this.arraySongs[this.ind].play=true;
     this.fireService.postRecentlyPlayed(this.arraySongs[this.ind]).subscribe()
    }
  }
}
