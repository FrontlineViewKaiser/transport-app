import { Component } from '@angular/core';
import { UploadService } from '../upload.service';
import { FirebaseService } from '../firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogueComponent } from '../edit-dialogue/edit-dialogue.component';
import { LoginServiceService } from '../login-service.service';
import { sendEmailVerification } from '@angular/fire/auth';

@Component({
  selector: 'app-user',
  host: {
    class: 'userInterface',
  },
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  userSubscription
  authSubscription;
  userVerified;

  constructor(
    public dialog: MatDialog,
    public uploadService: UploadService,
    public fireBaseService: FirebaseService,
    public loginService: LoginServiceService
  ) {
    this.authSubscription = this.fireBaseService.authSubject.subscribe(
      (user) => {
        if (user) {
          console.log('Email Verified:', user.emailVerified);
          this.userVerified = user.emailVerified;
        } else {
          console.log('No user data available');
        }
      }
    );
  }


  resendEmailVerification() {
    sendEmailVerification(this.loginService.auth.currentUser)
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  openDialog() {
    this.dialog.open(EditDialogueComponent);
  }
}
