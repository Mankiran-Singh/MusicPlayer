import { ElementRef, EventEmitter, Injectable } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }
  dataEmitter=new EventEmitter<any>();
  raiseDataEmitterEvent(data:any)
  {
      this.dataEmitter.emit(data)
  }
}