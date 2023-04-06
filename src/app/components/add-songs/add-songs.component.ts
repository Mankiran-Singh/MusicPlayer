import { Component } from '@angular/core';
import {Storage, 
  ref, uploadBytesResumable,
  getDownloadURL} from '@angular/fire/storage';
  import { SafePipe } from 'safe-pipe';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-add-songs',
  templateUrl: './add-songs.component.html',
  styleUrls: ['./add-songs.component.scss']
})
export class AddSongsComponent {
  public file:any={}
  constructor(public storage:Storage,
    private fireService:FirebaseService,
    private dialogRef:MatDialog){}
  

  chooseFile(event:any){
    this.file=event.target.files[0];
  }
  urlDownload:any;
  array:any=[]
  addData(){
    const storageRef=ref(this.storage,`mimify/${this.file.name}`)
    const uploadTask=uploadBytesResumable(storageRef,this.file);
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
           this.fireService.postAudioUrl({'name':this.file.name,'type':this.file.type,'url':downloadURl}).subscribe((res)=>{
              //this.fireService.getAudio();
           })
      })
   })
  }

  onCancelUserDialog(): void {
    this.dialogRef.closeAll()
  }

}
