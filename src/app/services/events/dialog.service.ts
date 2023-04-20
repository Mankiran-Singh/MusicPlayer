import { EventEmitter, Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'


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
  raiseDataEmitterEvent2()
  {
      this.dataEmitter2.emit()
  }
}