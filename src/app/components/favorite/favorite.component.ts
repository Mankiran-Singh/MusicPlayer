import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { debounceTime, fromEvent, map } from 'rxjs';
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
  urlLike=Images.urlHeart
  urlDislike=Images.urlDislike
  constructor(private fireService:FirebaseService,private router:Router,private authService:AuthService){
    this.fireService.getAudioFavourite().pipe(map((res:any)=>{
      for(const key in res){
        if(res.hasOwnProperty(key)){
          const array:any=Object.values(res[key])
          this.audioArray.push({'res':array[0].audio,'index':array[0].index,'id':key})        
        }
      }
    })).subscribe((res)=>{
    })
  }

  logOut(){
    this.authService.logOut().subscribe(()=>{
      this.router.navigate(['login'])
    })
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
    .subscribe((res)=>{
      this.fireService.putAudiourl(audio.res,audio.res.id).subscribe((res)=>{
        console.log(res)
      })
    })
  }

  open=true;
  openSongs(arraySongs:any){
    this.authService.raiseDataEmitterEvent(arraySongs)
    this.open=!this.open
  }

  reqData:any;
  audioSongsArray:any=[]
  @ViewChild('myInput') myInput:any;
  ngAfterViewInit(){
    const search = fromEvent<any>(this.myInput.nativeElement,'keyup').pipe(
      map(event =>event.target.value),
         debounceTime(1000)
      )
     search.subscribe((res:any)=>{
        for(let i=0;i<this.audioArray.length;i++)
        {
           if(this.audioArray[i].name.includes(res))
           {
             this.reqData=this.audioArray[i].name
             this.audioSongsArray=this.audioArray[i]
           }
        }
        //this.loadingBar.stop()
        setTimeout(()=>{
          this.reqData=null
        },2000)
      })
  }}
