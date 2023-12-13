import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '../models/error-state-matcher';
import { LoginServiceService } from '../login-service.service';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-edit-dialogue',
  templateUrl: './edit-dialogue.component.html',
  styleUrls: ['./edit-dialogue.component.scss']
})
export class EditDialogueComponent {

  currentUserSubscription

  name
  phone
  email
  locationsEU
  locationsUA
  vehicle
  goods
  

  constructor(public loginService: LoginServiceService, public firebaseService: FirebaseService) {
    this.currentUserSubscription = this.firebaseService.currentUserSubject.subscribe(user => {
      if (user) {
        this.name = user.profile.name;
        this.email = user.profile.email;
        this.phone = user.profile.tel;
        this.locationsEU = user.profile.from
        this.locationsUA = user.profile.to
        this.vehicle = user.profile.vehicle
        this.goods = user.profile.goods
      }
    });
    console.log(
      this.name,
      this.email,
      this.phone,
      this.locationsEU,
      this.locationsUA,   
      this.vehicle,
      this.goods,
    )
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

}
