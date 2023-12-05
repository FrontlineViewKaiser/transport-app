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

  constructor(public dialog: MatDialog, public FirebaseService: FirebaseService) {
    this.getSupplierData() 
  }

  openDialog(component) {
    this.dialog.open(component);
  }

  getSupplierData() {
   let users = this.FirebaseService.userList
   this.suppliers = users.filter(user => user.driver == true)
   console.log('driverlist:', this.suppliers)
  }

  
}
