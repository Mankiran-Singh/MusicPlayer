import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private http:HttpClient) { }
  urlDownload='gs://spotify-32974.appspot.com/mimify'
   url='https://spotify-32974-default-rtdb.firebaseio.com/.json'
  getAudio(){
    return this.http.get(this.url);
  }
  postAudioUrl(data:any){
    return this.http.post(this.url,data)
  }
}
