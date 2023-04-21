import { Component } from '@angular/core';
import {Images} from 'src/app/files/constant'
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
 urlgif=Images.urlGif
}
