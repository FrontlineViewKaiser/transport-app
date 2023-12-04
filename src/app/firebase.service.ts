import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  onSnapshot,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  userColl;
  driverColl;
  supplierColl;
  reviewsColl;

  unsubUser;
  userList = [];
  currentUser = {}

  constructor(public firestore: Firestore) {
    this.setupSubscriptions();
  }

  setupSubscriptions() {
    this.userColl = collection(this.firestore, 'users');
    this.driverColl = collection(this.firestore, 'drivers');
    this.supplierColl = collection(this.firestore, 'suppliers');
    this.reviewsColl = collection(this.firestore, 'reviews');

    this.unsubUser = onSnapshot(this.userColl, (users) => {
      this.userList = [];
      users.forEach((user) => {
        this.userList.push(user.data());
      });

      console.log(this.userList);
    });
  }

  ngOnDestroy() {
    if (this.unsubUser) {
      this.unsubUser();
    }
  }
}
