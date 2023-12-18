import { Component } from '@angular/core';
import { DetailDialogueComponent } from '../detail-dialogue/detail-dialogue.component';
import { ContactDialogueComponent } from '../contact-dialogue/contact-dialogue.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FirebaseService } from '../firebase.service';
import { LoginServiceService } from '../login-service.service';
import { DisplayService } from '../display.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
})
export class SupplierComponent {
  DetailDialogue = DetailDialogueComponent;
  ContactDialogue = ContactDialogueComponent;
  subscription: any;
  filterSelect: boolean = false;


  constructor(
    public dialog: MatDialog,
    public FirebaseService: FirebaseService,
    public loginService: LoginServiceService,
    public displayService: DisplayService
  ) {
  }

  ngOnDestroy() {
    this.displayService.resetFilters();
  }
  
  openDialog(component, driver) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      driver: driver,
    };
    this.dialog.open(component, dialogConfig);
  }

}
