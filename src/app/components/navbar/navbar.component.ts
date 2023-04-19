import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, fromEvent, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service'
import Swal from 'sweetalert2';
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
    private playPause:PlayPauseService){
        this.fireService.getPayment().pipe(map((res:any)=>{
          for(const key in res){
              this.token=res[key].token
              this.id=res[key].id
              this.arrayPayment.push({...res[key]})
          }
        })).subscribe()
  }
  
  @ViewChild('myInput') myInput:any;
  ngOnInit(){
    console.log("OnInit called----")
    this.fireService.getAudio().pipe(map((res:any)=>{
      for(const key in res){
          this.audioArray.push({...res[key],'id':key})
      }
    })).subscribe();
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
          this.audioArray[i].name=this.audioArray[i].name.toLowerCase();
           if(this.audioArray[i].name.includes(res.toLowerCase()))
           {
             this.reqData=this.audioArray[i].name
             this.audioSongsArray=this.audioArray[i]
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
    console.log(this.payForm.value)
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
  addedData=false;
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
             'type':this.file.type,'url':downloadURl,'liked':true,'premium':true,'amount':this.paymentArray[0].payment}).subscribe(()=>{
              this.fireService.getAudio().pipe(map((res:any)=>{
                for(const key in res){
                    this.audioArray.push({...res[key],'id':key})
                }
                this.addedData=true
              })).subscribe()
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
