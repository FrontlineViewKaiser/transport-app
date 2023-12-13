import { Component } from '@angular/core';
import { UploadService } from '../upload.service';
import { FirebaseService } from '../firebase.service';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '../models/error-state-matcher';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogueComponent } from '../edit-dialogue/edit-dialogue.component';


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
    public dialog: MatDialog,
    public uploadService: UploadService,
    public fireBaseService: FirebaseService,
  ) {}



  openDialog() {
    this.dialog.open(EditDialogueComponent)
  }
}
