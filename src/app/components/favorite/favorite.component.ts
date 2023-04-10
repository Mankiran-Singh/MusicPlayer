import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { map } from 'rxjs';
import { Images } from 'src/app/files/constant';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent {
  url=Images.url
  urlPlay=Images.urlPlay
  audioArray:any=[];
  urlPause=Images.urlPause
  urlDelete=Images.delete
  idArray:any=[]


  constructor(private fireService:FirebaseService){
    this.fireService.getAudioFavourite().pipe(map((res:any)=>{
      for(const key in res){
        if(res.hasOwnProperty(key)){
          console.log("==>",res[key])
          this.audioArray.push({...res[key].audio})
        }
      }
    })).subscribe((res)=>{
    })
  }
 
   audio=new Audio();
    
  playable=false;
  pauseAudio(j:any) { 
    console.log("==>"+this.audioArray[j].url)
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
  }

  urlSound=''
  getAudio(j:any){
      this.audioArray[j].audioPlay=false
      this.urlSound=this.audioArray[j].url
      this.audioArray[j].showAudio = !this.audioArray[j].showAudio;
  }

  delete(index:any){
    console.log(index)
   this.fireService.delete(index)
   .subscribe((res)=>{
      console.log(res)
   })
  }
}
