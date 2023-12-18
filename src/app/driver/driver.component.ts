import { Component } from '@angular/core';
import { DetailDialogueComponent } from '../detail-dialogue/detail-dialogue.component';
import { ContactDialogueComponent } from '../contact-dialogue/contact-dialogue.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FirebaseService } from '../firebase.service';
import { Subscription } from 'rxjs';
import { LoginServiceService } from '../login-service.service';
import { DisplayService } from '../display.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss'],
})
export class DriverComponent {
  DetailDialogue = DetailDialogueComponent;
  ContactDialogue = ContactDialogueComponent;
  subscription;
  filterSelect: boolean = false;


  constructor(
    public dialog: MatDialog,
    public loginService: LoginServiceService,
    public displayService: DisplayService
  ) {

  }
  ngOnDestroy() {
    this.displayService.resetFilters();
  }

    







}
