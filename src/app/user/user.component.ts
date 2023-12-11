import { Component } from '@angular/core';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  constructor(public uploadService: UploadService) {
    
    this.uploadService.downloadFile('profilePic')
  }

}
