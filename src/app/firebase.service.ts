import { Injectable } from '@angular/core';
import { getAuth, signOut } from '@angular/fire/auth';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  onSnapshot,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  userColl;
  driverColl;
  supplierColl;
  reviewsColl;

  unsubUser;
  unsubCurrentUser;
  userList = [];
  currentUser = {};

  constructor(public firestore: Firestore, private router: Router) {
    this.setupSubscriptions();
    this.retrieveUserData();
    let auth = getAuth().currentUser;

    if (auth) {
      this.retrieveCurrentUser(auth.uid);
    } else {
      console.log('no user')
    }
  }

  setupSubscriptions() {
    this.userColl = collection(this.firestore, 'users');
    this.driverColl = collection(this.firestore, 'drivers');
    this.supplierColl = collection(this.firestore, 'suppliers');
    this.reviewsColl = collection(this.firestore, 'reviews');
  }

  retrieveUserData() {
    this.unsubUser = onSnapshot(this.userColl, (users) => {
      this.userList = [];
      users.forEach((user) => {
        this.userList.push(user.data());
      });

      console.log('Userlist:', this.userList);
    });
  }

  retrieveCurrentUser(uid) {
    this.unsubCurrentUser = onSnapshot(doc(this.userColl, uid), (user) => {
      this.currentUser = user.data();
      console.log('currentUser:', this.currentUser);
    });
  }

  signOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        if (this.unsubUser) {
          this.unsubUser();
          this.unsubCurrentUser();
          this.userList = [];
          this.currentUser = {};
          this.router.navigate(['']);
        }
      })
      .catch((error) => {});
  }


}
