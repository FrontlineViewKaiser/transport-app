import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  userColl
  driverColl
  supplierColl
  reviewsColl


  constructor(public firestore: Firestore) {
    this.setupSubscriptions()
   }

   setupSubscriptions() {
    this.userColl = collection(this.firestore, 'users')
    this.driverColl = collection(this.firestore, 'drivers')
    this.supplierColl = collection(this.firestore, 'suppliers')
    this.reviewsColl = collection(this.firestore, 'reviews')


   }


}
