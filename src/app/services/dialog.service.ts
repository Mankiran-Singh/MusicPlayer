import { ElementRef, Injectable } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { AddSongsComponent } from '../components/add-songs/add-songs.component'

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  public openDialog({ positionRelativeToElement,
    hasBackdrop = false, height = '135px', width = '290px',bottom='500px'}:
    {
      positionRelativeToElement: ElementRef, hasBackdrop?: boolean,
      height?: string, width?: string,bottom?:string
    }): MatDialogRef<AddSongsComponent> {

    const dialogRef: MatDialogRef<AddSongsComponent> =
      this.dialog.open(AddSongsComponent, {
        hasBackdrop:hasBackdrop,
        height: height,
        width: width,
        data: { positionRelativeToElement: positionRelativeToElement }
      })
    return dialogRef
  }
}