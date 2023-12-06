import { Injectable } from '@angular/core';
import { Auth, getAuth, signOut } from '@angular/fire/auth';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  onSnapshot,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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

  constructor(
    public firestore: Firestore,
    private router: Router,
    public auth: Auth
  ) {
    this.setupSubscriptions();
    this.retrieveUserData();
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.retrieveCurrentUser(user.uid);
      } else {
        console.error('NO USER');
        this.unsubUser();
        this.unsubCurrentUser();
        this.router.navigate(['']);
      }
    });
  }

  setupSubscriptions() {
    this.userColl = collection(this.firestore, 'users');
    this.driverColl = collection(this.firestore, 'drivers');
    this.supplierColl = collection(this.firestore, 'suppliers');
    this.reviewsColl = collection(this.firestore, 'reviews');
  }

  retrieveUserData() {
    return new Observable((subscriber) => {
      this.unsubUser = onSnapshot(this.userColl, (users) => {
        let userList = [];
        users.forEach((user) => {
          userList.push(user.data());
        });

        console.log('Userlist:', userList);
        subscriber.next(userList);
      });
    });
  }

  retrieveCurrentUser(uid) {
    return new Observable((subscriber) => {
      this.unsubCurrentUser = onSnapshot(doc(this.userColl, uid), (user) => {
        let currentUser = user.data();
        console.log('currentUser:', currentUser);
        subscriber.next(currentUser);
      });
    });
  }

  signOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        if (this.unsubUser) {
          this.unsubUser();
          this.unsubCurrentUser();
          this.router.navigate(['']);
        }
      })
      .catch((error) => {});
  }
}
