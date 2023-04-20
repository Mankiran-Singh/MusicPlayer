import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, fromEvent, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service'
import {Images} from 'src/app/files/constant';
import {Storage, 
  ref, uploadBytesResumable,
  getDownloadURL} from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/services/events/dialog.service';
import { PlayPauseService } from 'src/app/services/playPause/play-pause.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  clicked=false;
  token='';
  id:any=0;
  audioArray:any=[]
  arrayPayment:any=[]
  url=Images.url

  constructor(public storage:Storage,
    private fireService:FirebaseService,
    private dialog:DialogService,
    private authService:AuthService,
    private router:Router,
    private playPause:PlayPauseService){}
  
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
        for(let i=0;i<this.playPause.audioArray.length;i++)
        {
          this.playPause.audioArray[i].name=this.playPause.audioArray[i].name.toLowerCase();
           if(this.playPause.audioArray[i].name.includes(res.toLowerCase()))
           {
             this.reqData=this.playPause.audioArray[i].name
             this.audioSongsArray=this.playPause.audioArray[i]
           }
        }
        setTimeout(()=>{
          this.reqData=null
        },2000)
      })
  }
  
  searchName='';
  showErrors=false;
  
  logOut(){
    this.authService.logOut().subscribe(()=>{
      localStorage.clear()
      this.router.navigate(['login'])
    })
  }
  
  isOpen=false;
  toggleDialog(){
    this.isOpen = !this.isOpen;
  }

  paymentArray:any=[]
  payForm=new FormGroup({
    payment: new FormControl('',[Validators.required])
  })

  amount=false;
  submitted=false;
  pay(){
    this.addImage=false;
    this.paymentArray.push(this.payForm.value)
    this.amount=true;
    this.submitted=true;
  }
  
  open=true;
  openSongs(arraySongs:any){
    if(arraySongs.amount==0){
       this.dialog.raiseDataEmitterEvent({'image':arraySongs.image,'url':arraySongs.url})
       this.open=false
    }else{
       this.playPause.sweetAlert2()
    }
  }

  public file:any={}
  chooseFile(event:any){
    this.file=event.target.files[0];
  }

  addImage=false;
  urlDownload:any;
  addData(file:any){
    this.amount=true;
    if(file.type=='audio/mpeg' && this.paymentArray[0].payment!=undefined || null){
      const storageRef=ref(this.storage,`mimify/${file.name}`)
      const uploadTask=uploadBytesResumable(storageRef,file);
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
             this.fireService.postAudioUrl({'image':this.image,
             'like':true,'audioPlay':true,'showAudio':true,
             'play':true,'name':this.file.name,'songPlay':true,
             'type':this.file.type,'url':downloadURl,'liked':true,'premium':true,'amount':this.paymentArray[0].payment})
             .subscribe((res)=>{
              // this.fireService.getAudio().pipe(map((res:any)=>{
              //   for(const key in res){
              //       this.playPause.audioArray.push({...res[key],'id':key})
              //   }
              // })).subscribe()
              this.dialog.raiseDataEmitterEvent2()
            })
        })
     })
    }else{
      this.playPause.sweet();
    }
  }

  image='';
  uploadImage(file:any){
    this.addImage=true;
    const storageRef=ref(this.storage,`mimify/${file.name}`)
    const uploadTask=uploadBytesResumable(storageRef,file);
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
}
