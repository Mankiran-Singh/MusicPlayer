import { Component, ElementRef, Inject } from '@angular/core';
import {Storage, 
  ref, uploadBytesResumable,
  getDownloadURL} from '@angular/fire/storage';
  import { SafePipe } from 'safe-pipe';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { arraySongs } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-songs',
  templateUrl: './add-songs.component.html',
  styleUrls: ['./add-songs.component.scss']
})
export class AddSongsComponent {
  public file:any={}
    constructor(public storage:Storage,
    private fireService:FirebaseService,
    ){}



  // ngOnInit() {
  //   const matDialogConfig = new MatDialogConfig()
  //   const rect: DOMRect = this.positionRelativeToElement.nativeElement.getBoundingClientRect()

  //   matDialogConfig.position = { right: `10px`, top: `${rect.bottom + 2}px` }
  //   this.dialogRef.updatePosition(matDialogConfig.position)
  // }
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
             this.fireService.postAudioUrl({'image':this.image,'audioPlay':true,'showAudio':true,'play':true,'name':this.file.name,'type':this.file.type,'url':downloadURl}).subscribe((res)=>{
              console.log(res)
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
}
