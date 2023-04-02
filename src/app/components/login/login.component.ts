import { Component } from '@angular/core';
import { Images } from 'src/app/files/constant';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
   url=Images.url
   urlBackground=Images.urlBackground
}
