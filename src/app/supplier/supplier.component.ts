import { Component } from '@angular/core';
import { DetailDialogueComponent } from '../detail-dialogue/detail-dialogue.component';
import { ContactDialogueComponent } from '../contact-dialogue/contact-dialogue.component';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent {
  DetailDialogue = DetailDialogueComponent
  ContactDialogue = ContactDialogueComponent
  suppliers = []
  subscription: any;

  constructor(public dialog: MatDialog, public FirebaseService: FirebaseService) {
    this.subscription = this.FirebaseService.retrieveUserData().subscribe(users => {
      this.suppliers = (users as any[]).filter(user => user.driver === true);
      console.log('driverlist:', this.suppliers);
    });
  }

  openDialog(component) {
    this.dialog.open(component);
  }


  
}
