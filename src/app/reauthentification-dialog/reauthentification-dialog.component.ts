import { Component } from '@angular/core';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-reauthentification-dialog',
  templateUrl: './reauthentification-dialog.component.html',
  styleUrls: ['./reauthentification-dialog.component.scss']
})
export class ReauthentificationDialogComponent {

  constructor(
    public LoginService: LoginServiceService
  ) {

  }

}
