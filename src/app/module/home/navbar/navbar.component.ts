import { AfterViewInit, Component, ViewChild } from '@angular/core';
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
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit{
  token='';
  id:any=0;
  audioArray:any=[]
  arrayPayment:any=[]
  url=Images.url
  urlGif=Images.urlGif

  constructor(public storage:Storage,
    private fireService:FirebaseService,
    private dialog:DialogService,
    private authService:AuthService,
    private router:Router,
    private playPause:PlayPauseService,private spinner:NgxSpinnerService){}
    
  
  @ViewChild('myInput') myInput:any;

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
      this.router.navigate(['auth/login'])
    })
  }
  
  isOpen=false;
  toggleDialog(){
    this.isOpen = !this.isOpen;
  }

  paymentArray:any=[]
  
  payForm:any;
  ngOnInit(){
    this.payForm=new FormGroup({
      payment: new FormControl('',[Validators.required]),
      file:new FormControl('',[Validators.required]),
      image:new FormControl('',[Validators.required]),
      fileSource:new FormControl('',[Validators.required]),
      fileSourceImage:new FormControl('',[Validators.required]),
      fileTypeFile:new FormControl('',[Validators.required]),
      fileName:new FormControl('',[Validators.required])
    })
  }

  clicked=false
  pay(){
    console.log(this.payForm.value)
    if(this.payForm.valid && this.payForm.value.payment>=0){
      this.fireService.postAudioUrl({'image':this.payForm.value.fileSourceImage,
     'like':true,'audioPlay':true,'showAudio':true,
     'play':true,'name':this.payForm.value.fileName,'songPlay':true,
     'type':this.payForm.fileTypeFile,'url':this.payForm.value.fileSource,'liked':true,'premium':true,'amount':this.payForm.value.payment})
     .subscribe((res)=>{
      console.log("===<.....",res)
      this.dialog.raiseDataEmitterEvent2(res)
      this.clicked=true
    })
      
    }
    else{
      this.showErrors=true;
      this.playPause.sweetPrice()
    }
  }
  
  get payment(){
    return this.payForm.get('payment')
  }
  get file(){
    return this.payment.get('file')
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

  fileInfo=''
//  public file:any={}
  chooseFile(event:any){
    if (event.target.files.length > 0){
      const file = event.target.files[0];
      this.fileInfo = `${file.name} (${this.formatBytes(file.size)})`;
      this.spinner.show();
         setTimeout(()=>{
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
              if(file.type=="image/png" || file.type=="image/jpg" || file.type=="image/jpeg"){
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURl)=>{
                  this.payForm.patchValue({
                    fileSourceImage: downloadURl,
                    fileTypeImage:file.type
                  }); 
                   this.spinner.hide();
                })
              }else{
                this.spinner.hide();
                this.playPause.sweetImage();
              }
           })
         })
    }
  }

  
  onFileChange(event:any) {
    if (event.target.files.length > 0){
     const file = event.target.files[0];
     this.spinner.show();
     setTimeout(()=>{
       if(file.type=='audio/mpeg'){
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
            this.payForm.patchValue({
              fileSource: downloadURl,
              fileTypeFile:file.type,
              fileName:file.name
             });
             this.spinner.hide();
           })
        })
       }else{
         this.spinner.show();
         setTimeout(()=>{this.spinner.hide()},1000)
         this.playPause.sweet();
       }
     },5000)
   }
 }

 get image(){
  return this.payForm.get('image')
 }


 formatBytes(bytes: number): string {
  const UNITS = ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const factor = 1024;
  let index = 0;

  while (bytes >= factor) {
    bytes /= factor;
    index++;
  }

  return `${parseFloat(bytes.toFixed(2))} ${UNITS[index]}`;
 }

}
