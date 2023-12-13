import { Component } from '@angular/core';
import { UploadService } from '../upload.service';
import { FirebaseService } from '../firebase.service';
import { Auth, getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-user',
  host: {
    class:'userInterface'
},
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  constructor(
    public uploadService: UploadService,
    public fireBaseService: FirebaseService,
  ) {}



}
