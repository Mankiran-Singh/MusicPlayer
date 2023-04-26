import { EventEmitter, Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  dataEmitter=new EventEmitter<any>();
  raiseDataEmitterEvent(data:any)
  {
      this.dataEmitter.emit(data)
  }

  dataEmitter1=new EventEmitter<any>();
  raiseDataEmitterEvent1(data:any)
  {
      this.dataEmitter1.emit(data)
  }

  dataEmitter2=new EventEmitter<any>();
  raiseDataEmitterEvent2(data:any)
  {
      this.dataEmitter2.emit(data)
  }

  dataEmitter3=new EventEmitter<any>();
  raiseDataEmitterEvent3(data:any)
  {
      this.dataEmitter3.emit(data)
  }

  dataEmitter4=new EventEmitter<any>();
  raiseDataEmitterEvent4(data:any)
  {
      this.dataEmitter4.emit(data)
  }
}