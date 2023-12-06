import { Component } from '@angular/core';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  constructor(public uploadService: UploadService) {}

  uploadFile(event:any) {
    let file: File = event.target.files[0] 

    if(file) {
      this.uploadService.uploadFile(file).then(downloadURL => {
        console.log('your picture is available at:', downloadURL)
      })
    }
  }

}
