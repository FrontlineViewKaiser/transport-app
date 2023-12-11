import { Injectable } from '@angular/core';
import { Auth, getAuth, signOut } from '@angular/fire/auth';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  userColl;
  driverColl;
  supplierColl;
  reviewsColl;
  currentUser;
  currentUserRef;

  unsubUser;
  unsubCurrentUser;
  currentUsersubscription;
  public currentUserSubject = new BehaviorSubject<any>(null);

  constructor(
    public firestore: Firestore,
    private router: Router,
    public auth: Auth
  ) {
    this.userColl = collection(this.firestore, 'users');
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

  UserSubscription() {
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

  CurrentUserSubscription(uid) {
    return new Observable((subscriber) => {
      this.unsubCurrentUser = onSnapshot(doc(this.userColl, uid), (user) => {
        subscriber.next(user.data());
        this.currentUserSubject.next(user.data());
      });
    });
  }

  async updateCurrentUser() {
    await updateDoc(this.currentUserRef, {
      profile: this.currentUser.profile,
      favorites: this.currentUser.favorites,
      color: this.currentUser.color,
      id: this.currentUser.id,
      driver: this.currentUser.driver,
      img: this.currentUser.img,
    });
  }

  signOut() {
    const auth = getAuth();
    signOut(auth).catch((error) => {});
  }
  
  retrieveCurrentUser(uid) {
    this.currentUsersubscription = this.CurrentUserSubscription(uid).subscribe((user) => {
      this.currentUser = user;
      console.log('currentUser:', this.currentUser);
      this.currentUserRef = doc(this.userColl, uid);
    })
  }

  ngOnDestroy() {
    this.currentUsersubscription.unsubscribe()
  }

}