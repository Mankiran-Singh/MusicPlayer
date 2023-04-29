import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  constructor(private http:HttpClient) { }
  urlDownload='gs://mimify-9c814.appspot.com'
  url='https://mimify-9c814-default-rtdb.firebaseio.com/mimicry'
  urlFavorite='https://mimify-9c814-default-rtdb.firebaseio.com/favourite/'
  urlRecent='https://mimify-9c814-default-rtdb.firebaseio.com/recentPlayed/'
  urlPayment='https://mimify-9c814-default-rtdb.firebaseio.com/paid'

  getAudio(){
    return this.http.get(this.url+".json");
  }
  postAudioUrl(data:any){
    return this.http.post(this.url+".json",data)
  }

  putAudiourl(audio:any,audioId:any){
    return this.http.put(`${this.url}/${audioId}.json`,audio)
  }
  
  deleteAudioUrl(index:any){
    return this.http.delete(`${this.url}${index}.json`)
  }

  postAudioFavourite(data:any){
    return this.http.post(`${this.urlFavorite}${data.audioId}.json`,data)
  }

  getAudioFavourite(){
    return this.http.get(this.urlFavorite+".json")
  }

  deleteFavourites(id:any){
   return this.http.delete(`${this.urlFavorite}${id}.json`)
  }

  deleteFavouritesFromHome(id:any){
    return this.http.delete(`https://spotify-32974-default-rtdb.firebaseio.com/favourite/${id}.json`)
  }

  putFavourites(audio:any,audioId:any){
    return this.http.put(`${this.urlFavorite}/${audioId}.json`,audio)
  }

  postRecentlyPlayed(data:any){
    return this.http.post(this.urlRecent+".json",data)
  }

  getRecentPlayed(){
    return this.http.get(this.urlRecent+".json")
  }

  postPayment(data:any){
    return this.http.post(this.urlPayment+".json",data)
  }

  getPayment(){
    return this.http.get(this.urlPayment+".json")
  }
}
