import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit{

// @Input() arraySongs:any=[];
particularSong:any=[]
constructor(private authService:AuthService){}
ngOnInit(){
  this.authService.dataEmitter.subscribe((res)=>{
    console.log(res)
    this.particularSong.push(res)
  })
}

}
