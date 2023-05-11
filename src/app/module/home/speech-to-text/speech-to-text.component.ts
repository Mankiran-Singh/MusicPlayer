import { Component,Input, OnChanges, OnInit} from '@angular/core';
import { Images } from 'src/app/files/constant';
import { TextToSpeechService } from 'src/app/services/TextToSpeech/text-to-speech.service';
import { DialogService } from 'src/app/services/events/dialog.service';
import { PlayPauseService } from 'src/app/services/playPause/play-pause.service';
declare let webkitSpeechRecognition:any;
@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.scss']
})
export class SpeechToTextComponent implements OnInit,OnChanges{
  @Input() audioObject:any={}
  @Input() index:any=0
  urlPlay=Images.urlPlay
  urlPause=Images.urlPause

  constructor(private playPauseService:PlayPauseService,private dialog:DialogService,private textToSpeechService:TextToSpeechService){}
  obj:any={}
  ind:any=0;
  ngOnInit(): void {
    this.obj=this.audioObject[this.index]
    //this?.play(this.index)
   }
  ngOnChanges(){
     this.ind=this.index;
     this.dialog.dataEmitter5.subscribe((res)=>{
       this.pauseAudio(res)
     })
     this.obj=this.audioObject[this.index]
     //this?.play(this.index)
  }

  recognition= new webkitSpeechRecognition();
  text:any=''
   audio=new Audio();
   play(j:any){
    //console.log(this.playPauseService.audioArray[j].url)
    if(this.obj.amount==0){
      this.audio.src=this.audioObject[j]?.url,
      this.audio.load()
      this.audio.play()
      this.audioObject[j].audioPlay=false;
      this.recognition.lang = 'hi-IN';
      this.recognition.maxAlternatives = 1;
      this.recognition.continuous = false;
      this.audio = new Audio(this.audioObject[j]?.url);
        this.audio.addEventListener('loadedmetadata', () => {
          this.recognition.audioFile = this.audio;
          this.recognition.start();
        });
        this.recognition.onresult = (event:any) => {
          const transcription = event.results[0][0].transcript;
          console.log(transcription)
          this.text=transcription
        };
    }else{
      this.playPauseService.sweetAlert2()
    }
  }

  pauseAudio(j:any) { 
    this.audio = new Audio(this.audioObject[j]?.url);
        this.audio.addEventListener('loadedmetadata', () => {
          this.recognition.audioFile = this.audio;
          this.recognition.stop();
        });
    this.audio.src=this.audioObject[j]?.url
    this.audio.pause();
    this.audioObject[j].audioPlay=true;
   } 
  
   speakText(text:any) {
    this.textToSpeechService.convertTextToSpeech(text);
  }
}
