import { Component,OnInit } from '@angular/core';
import { DialogService } from 'src/app/services/events/dialog.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit{

particularSong:any=[]
constructor(private dialog:DialogService){}
ngOnInit(){
  this.dialog.dataEmitter.subscribe((res)=>{
    this.particularSong.push(res)
  })
}

hide=false
  hideContainer(){
     this.hide=!this.hide
  }
}
