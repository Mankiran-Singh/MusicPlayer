import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Images } from 'src/app/files/constant';
import * as moment from 'moment';
@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit{

  urlBackground=Images.back
  urlPlay=Images.urlPlay;
  urlPause=Images.urlPause;
  urlNextSong=Images.nextSong;
  urlPreviousSong=Images.previousSong;

  @Input() arraySongs:any=[]
  @Input() index:any;
  songPlayer:any={}

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
  ngOnInit(){
     console.log(this.index,this.arraySongs)
     this.ind=this.index;
     this.songPlayer=this.arraySongs[this.index]
     console.log("=>",this.songPlayer)
  }

  audio=new Audio();
  playable=false;
  pauseAudio(j:any) { 
    console.log("==>"+this.arraySongs[j].url)
    this.audio.src=this.arraySongs[j].url
    this.audio.pause();
    this.arraySongs[j].songPlay=true;
  } 
  currentTime:any=0;
  duration:any=0;
  seek:any=0;
  play(j:any){
     this.arraySongs[j].songPlay=false;
     this.streamObserver(this.arraySongs[j].url).subscribe((res)=>{
      console.log(res)
     })
  }
  
  hide=true;
  hideContainer(){
     this.hide=false;
  }
 
  setVolume(event:any){
    this.audio.currentTime=event.target.value
    console.log("===>",event.target.value)
  }

  setSeekTo(event:any){
    this.audio.volume=event.target.value
  }
   
  streamObserver(url:any){
    return new Observable((observer:any)=>{
      this.audio.src=url
      this.audio.load();
      this.audio.play();
      const handler= (event:Event)=>{
        this.seek=this.audio.currentTime
        this.duration=this.formatTime(this.audio.duration)
        this.currentTime=this.formatTime(this.audio.currentTime)
        console.log("===>",this.currentTime)
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
  formatTime(time: number, format: string = "HH:mm:ss") {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }
 
  nextSong(audioObj:any,j:any){
      this.songPlayer=this.arraySongs[(j+1)%this.arraySongs.length] 
  }

  previousSong(audioObj:any,j:any){
      this.songPlayer=this.arraySongs[(j-1)%this.arraySongs.length]
  }
}
