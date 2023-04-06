import { Component, ElementRef, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Images } from 'src/app/files/constant';
import { AuthService } from 'src/app/services/auth.service';
import { Constant } from 'src/app/files/constant';
import { debounceTime, fromEvent, map } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { AddSongsComponent } from '../../add-songs/add-songs.component';
import { LoadingBarService } from '@ngx-loading-bar/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  url=Images.url
  searchForm:any
  urlPlay=Images.urlPlay
  user$=this.authService.currentUser$;
  audioArray:any=[];
  urlPause=Images.urlPause
  idArray:any=[]
  constructor(public authService:AuthService,
    private loadingBar:LoadingBarService,
    private router:Router,private dialogref:MatDialog,
    private fireService:FirebaseService){
    this.fireService.getAudio().pipe(map((res:any)=>{
      for(const key in res){
        if(res.hasOwnProperty(key)){
          this.audioArray.push({...res[key]})
          this.idArray.push(key)
        }
      }
    })).subscribe((res)=>{
    })
  }
  
  @ViewChild('myInput') myInput:any;
  ngOnInit(){
     this.searchForm=new FormGroup({
       search:new FormControl('',[Validators.required])
     })
  }
  reqData:any;
  ngAfterViewInit(){
    const search = fromEvent<any>(this.myInput.nativeElement,'keyup').pipe(
      map(event =>event.target.value),
         debounceTime(1000)
      )
     search.subscribe((res:any)=>{
      console.log(res)
        this.reqData=res //imp
        this.loadingBar.stop()
        setTimeout(()=>{
          this.reqData=null
        },2000)
      })
  }
  
  searchName='';
  showErrors=false;
  searching(){
    if(this.searchForm.valid){
      this.fireService.getAudio().pipe(map((res:any)=>{
        for(const key in res){
          if(res.hasOwnProperty(key)){
           // if(this.searchForm.value.search==res[key].name)
              console.log(res[key].name)
              this.searchName=res[key].name
          }
        }
      })).subscribe((res)=>{
      })
    }else{
      this.showErrors=true;
    }
  }
  
  get search(){
    return this.searchForm.get('search')
  }
  
  logOut(){
    this.authService.logOut().subscribe(()=>{
      this.router.navigate(['login'])
    })
  }
   audio=new Audio();
  pauseAudio(j:any) { 
    this.audio.src=this.audioArray[j].url
    this.audio.pause();
  } 

  play(j:any){
    this.audio.src=this.audioArray[j].url,
    this.audio.load()
    this.audio.play()
  }
  
  openDialog(){
       this.dialogref.open(AddSongsComponent); 
    
  }
}
