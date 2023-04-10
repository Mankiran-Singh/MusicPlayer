import { Component, ElementRef, EventEmitter, Input, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Images } from 'src/app/files/constant';
import { AuthService } from 'src/app/services/auth.service';
import { debounceTime, fromEvent, map } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MatDialog} from '@angular/material/dialog';
import { AddSongsComponent } from '../../add-songs/add-songs.component';
import { LoadingBarService } from '@ngx-loading-bar/core';
import Swal from 'sweetalert2';
import { DialogService } from 'src/app/services/dialog.service';
import {Storage, 
  ref, uploadBytesResumable,
  getDownloadURL} from '@angular/fire/storage';
import { arraySongs } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    
  ]
})
export class HomeComponent {
  url=Images.url
  urlPlay=Images.urlPlay
  user$=this.authService.currentUser$;
  urlLike=Images.urlHeart;
  urlDislike=Images.urlDislike;
  audioArray:any=[];
  urlPause=Images.urlPause
  idArray:any=[]


  constructor(public authService:AuthService,
    private loadingBar:LoadingBarService,
    private router:Router,
    private _dialog: MatDialog,
    private fireService:FirebaseService,
    public storage:Storage,
    private dialogService:DialogService){
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
   
  }
  reqData:any;
  audioSongsArray:any=[]
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
        this.loadingBar.stop()
        setTimeout(()=>{
          this.reqData=null
        },2000)
      })
  }
  
  searchName='';
  showErrors=false;
  searching(){
    // if(this.searchForm.valid){
    //   this.fireService.getAudio().pipe(map((res:any)=>{
    //     for(const key in res){
    //       if(res.hasOwnProperty(key)){
    //        // if(this.searchForm.value.search==res[key].name)
    //           this.searchName=res[key].name
    //       }
    //     }
    //   })).subscribe((res)=>{
    //   })
    // }else{
    //   this.showErrors=true;
    // }
  }
  
  // get search(){
  //   return this.searchForm.get('search')
  // }
  
  logOut(){
    this.authService.logOut().subscribe(()=>{
      this.router.navigate(['login'])
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
    isOpen=false;
  toggleDialog(){
    this.isOpen = !this.isOpen;
  }

  openSongs(arraySongs:any){
    this.authService.raiseDataEmitterEvent(arraySongs)
  }

  urlSound=''
  getAudio(j:any){
      this.audioArray[j].audioPlay=false
      this.urlSound=this.audioArray[j].url
      this.audioArray[j].showAudio = !this.audioArray[j].showAudio;
  }
  public file:any={}
  chooseFile(event:any){
    this.file=event.target.files[0];
  }

  addImage=false;
  urlDownload:any;
  addData(file:any){
    this.addImage=false;
    if(file.type=='audio/mpeg'){
      const storageRef=ref(this.storage,`mimify/${file.name}`)
      const uploadTask=uploadBytesResumable(storageRef,file);
      arraySongs.push(uploadTask)
      uploadTask.on('state_changed',
      (snapshot)=>{
        const progress=(snapshot.bytesTransferred / snapshot.totalBytes)
        console.log('upload is'+progress+'%done');
      },
      (error)=>{
         console.log(error.message)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURl)=>{
             this.fireService.postAudioUrl({'image':this.image,'like':true,'audioPlay':true,'showAudio':true,'play':true,'name':this.file.name,'type':this.file.type,'url':downloadURl}).subscribe((res)=>{
              this.fireService.getAudio().pipe(map((res:any)=>{
                for(const key in res){
                  if(res.hasOwnProperty(key)){
                    this.audioArray.push({...res[key]})
                  }
                }
              })).subscribe((res)=>{
              })
            })
        })
     })
    }else{
      this.sweet()
    }
  }

  image='';
  uploadImage(file:any){
    this.addImage=true;
    const storageRef=ref(this.storage,`mimify/${this.file.name}`)
    const uploadTask=uploadBytesResumable(storageRef,this.file);
    arraySongs.push(uploadTask)
    uploadTask.on('state_changed',
    (snapshot)=>{
      const progress=(snapshot.bytesTransferred / snapshot.totalBytes)
      console.log('upload is'+progress+'%done');
    },
    (error)=>{
       console.log(error.message)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURl)=>{
         this.image=downloadURl 
      })
   })
  }

  sweet(){
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'error',
    title: 'Please select mp3 type audio'
  })
  }

  like(audio:any,index:any){
    this.audioArray[index].like=false
    this.fireService.postAudioFavourite({'audio':audio}).subscribe((res)=>{
      console.log("++>",res)
      this.router.navigate(['favorite'])
    })
  }
  disLike(audio:any,index:any){
    if(this.audioArray[index].like==false){
       this.audioArray[index].like=false
    }else{
      this.audioArray[index].like=true
    }
  }

}
