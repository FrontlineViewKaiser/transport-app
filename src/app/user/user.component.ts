import { Component } from '@angular/core';
import { UploadService } from '../upload.service';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  constructor(public uploadService: UploadService, public fireBaseService: FirebaseService) {
  }



}
