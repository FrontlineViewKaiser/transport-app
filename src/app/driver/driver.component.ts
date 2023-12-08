import { Component } from '@angular/core';
import { DetailDialogueComponent } from '../detail-dialogue/detail-dialogue.component';
import { ContactDialogueComponent } from '../contact-dialogue/contact-dialogue.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FirebaseService } from '../firebase.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent {
  DetailDialogue = DetailDialogueComponent
  ContactDialogue = ContactDialogueComponent
  subscription;
  drivers = []

  constructor(public dialog: MatDialog, public FirebaseService: FirebaseService) {
    this.subscription = this.FirebaseService.UserSubscription().subscribe(users => {
      this.drivers = (users as any[]).filter(user => user.driver === true);
      console.log('driverlist:', this.drivers);
    });
  }

  openDialog(component, driver) {
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      driver: driver
    };
    this.dialog.open(component, dialogConfig);
  }




}
