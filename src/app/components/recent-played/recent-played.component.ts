import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, fromEvent, map } from 'rxjs';
import { Images } from 'src/app/files/constant';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-recent-played',
  templateUrl: './recent-played.component.html',
  styleUrls: ['./recent-played.component.scss']
})
export class RecentPlayedComponent {
  url=Images.url
  urlPlay=Images.urlPlay
  urlLike=Images.urlHeart;
  urlDislike=Images.urlDislike;
  audioArray:any=[];
  urlPause=Images.urlPause
  myset=new Set();
   newArray:any = [];
    uniqueObject :any= {};
  constructor(private router:Router,
    private fireService:FirebaseService,
    private authService:AuthService,private dialogService:DialogService){
    this.fireService.getRecentPlayed().pipe(map((res:any)=>{
      for(const key in res){
        if(res.hasOwnProperty(key)){
           this.audioArray.push(res[key])       
        }
      }
    })).subscribe((res:any)=>{
      for (let i in this.audioArray) {
              
        // Extract the title
       let objTitle = this.audioArray[i]['id'];
      
        // Use the title as the index
        this.uniqueObject[objTitle] = this.audioArray[i];
    }
      
    // Loop to push unique object into array
    for (let i in this.uniqueObject) {
        this.newArray.push(this.uniqueObject[i]);
    }
      
    // Display the unique objects
    //console.log("===========",this.newArray);
    })
    // console.log(this.myset.entries())
  }
  audio=new Audio();
    
  playable=false;
  pauseAudio(j:any) { 
   // console.log("==>"+this.audioArray[j].url)
    this.audio.src=this.newArray[j].url
    this.audio.pause();
    this.newArray[j].play=true;
  } 

  play(j:any){
   // console.log("===>",this.audioArray[j].url)
    this.audio.src=this.newArray[j].url,
    this.audio.load()
    this.audio.play()
    this.newArray[j].play=false;
    if(this.newArray[j].play==false){
      for(let i=j+1;i<this.newArray.length;i++)
      {
        this.newArray[i].play= true;
      }
      for(let i=j-1;i>=0;i--)
      {
        this.newArray[i].play= true;
      }
    }
  }
  logOut(){
    this.authService.logOut().subscribe(()=>{
      this.router.navigate(['login'])
    })
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
  }

  openSongs(arraySongs:any){
    this.authService.raiseDataEmitterEvent(arraySongs)
  }
}


