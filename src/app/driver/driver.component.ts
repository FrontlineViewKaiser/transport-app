import { Component } from '@angular/core';
import { DetailDialogueComponent } from '../detail-dialogue/detail-dialogue.component';
import { ContactDialogueComponent } from '../contact-dialogue/contact-dialogue.component';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent {
  DetailDialogue = DetailDialogueComponent
  ContactDialogue = ContactDialogueComponent
  drivers = []

  constructor(public dialog: MatDialog, public FirebaseService: FirebaseService) {
    this.getDriverData() 
  }

  openDialog(component) {
    this.dialog.open(component);
  }

  getDriverData() {
   let users = this.FirebaseService.userList
   this.drivers = users.filter(user => user.driver == true)
   console.log('driverlist:', this.drivers)
  }



}
