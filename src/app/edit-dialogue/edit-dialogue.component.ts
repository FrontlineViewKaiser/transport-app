import { Component } from '@angular/core';
import { LoginServiceService } from '../login-service.service';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-edit-dialogue',
  templateUrl: './edit-dialogue.component.html',
  styleUrls: ['./edit-dialogue.component.scss'],
})
export class EditDialogueComponent {
  currentUserSubscription;
  driverStatus;

  constructor(
    public loginService: LoginServiceService,
    public firebaseService: FirebaseService
  ) {
    this.currentUserSubscription =
      this.firebaseService.currentUserSubject.subscribe((user) => {
        if (user) {
          this.loginService.nameFormControl.setValue(user.profile.name);
          this.loginService.emailFormControl.setValue(user.profile.email);
          this.loginService.phoneFormControl.setValue(user.profile.tel);
          this.loginService.locationsUAFormControl.setValue(user.profile.to);
          this.loginService.locationsEUFormControl.setValue(user.profile.from);
          this.loginService.vehicleFormControl.setValue(user.profile.vehicle);
          this.loginService.goodsFormControl.setValue(user.profile.goods);
          this.driverStatus = user.driver;
        }
      });
      
  }

  editProfile() {
    let email = this.loginService.emailFormControl.value;
    if (email != this.firebaseService.currentUser.profile.email) {
      this.compileChanges();
      this.loginService.updateEmail(email);
    } else {
      this.compileChanges();
      this.firebaseService.updateCurrentUser();
    }
    this.loginService.changePassword = false
  }

  compileChanges() {
    let profile = this.firebaseService.currentUser.profile;
    profile.name = this.loginService.nameFormControl.value;
    profile.email = this.loginService.emailFormControl.value;
    profile.tel = this.loginService.phoneFormControl.value;
    profile.to = this.loginService.locationsUAFormControl.value;
    profile.from = this.loginService.locationsEUFormControl.value;
    profile.vehicle = this.loginService.vehicleFormControl.value;
    profile.goods = this.loginService.goodsFormControl.value;
    this.firebaseService.currentUser.driver = this.driverStatus;


  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();

    this.loginService.nameFormControl.reset('');
    this.loginService.emailFormControl.reset('');
    this.loginService.phoneFormControl.reset('')
    this.loginService.locationsUAFormControl.reset('')
    this.loginService.locationsEUFormControl.reset('')
    this.loginService.vehicleFormControl.reset('')
    this.loginService.goodsFormControl.reset('')
  }
}
