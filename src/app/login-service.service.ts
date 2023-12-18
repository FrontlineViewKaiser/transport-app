import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from './models/error-state-matcher';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseService } from './firebase.service';
import { doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  constructor(
    private FirebaseService: FirebaseService,
    private router: Router
  ) {}

  locationsEU = [
    'All of Europe',
    'EU only',
    'Albania',
    'Andorra',
    'Armenia',
    'Austria',
    'Azerbaijan',
    'Belgium',
    'Bosnia and Herzegovina',
    'Bulgaria',
    'Croatia',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Estonia',
    'Finland',
    'France',
    'Georgia',
    'Germany',
    'Greece',
    'Hungary',
    'Iceland',
    'Ireland',
    'Italy',
    'Kosovo',
    'Latvia',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Malta',
    'Moldova',
    'Monaco',
    'Montenegro',
    'Netherlands',
    'North Macedonia',
    'Norway',
    'Poland',
    'Portugal',
    'Romania',
    'San Marino',
    'Serbia',
    'Slovakia',
    'Slovenia',
    'Spain',
    'Sweden',
    'Switzerland',
    'Turkey',
    'Ukraine',
    'United Kingdom',
    'Vatican City',
  ];

  locationsUA = [
    'All of Ukraine',
    'Only Frontline',
    'Only Safe Areas',
    'Cherkasy Oblast',
    'Chernihiv Oblast',
    'Chernivtsi Oblast',
    'Dnipropetrovsk Oblast',
    'Donetsk Oblast',
    'Ivano-Frankivsk Oblast',
    'Kharkiv Oblast',
    'Kherson Oblast',
    'Khmelnytskyi Oblast',
    'Kiev Oblast',
    'Kirovohrad Oblast',
    'Luhansk Oblast',
    'Lviv Oblast',
    'Mykolaiv Oblast',
    'Odessa Oblast',
    'Poltava Oblast',
    'Rivne Oblast',
    'Sumy Oblast',
    'Ternopil Oblast',
    'Vinnytsia Oblast',
    'Volyn Oblast',
    'Zakarpattia Oblast',
    'Zaporizhzhia Oblast',
    'Zhytomyr Oblast',
  ];

  vehicles = [
    'Car',
    'PickUp',
    'Minivan',
    'Van',
    'Box-Truck',
    'Bus',
    'Truck 2 Axle',
    'Truck 3 Axle',
    'Truck 4 Axle',
    'Truck 5 Axle or bigger',
  ];

  goods = ['Weapons', 'Humanitarian Aid', 'Food'];

  colors = [
    '#FF7A00',
    '#FF5EB3',
    '#6E52FF',
    '#9327FF',
    '#00BEE8',
    '#1FD7C1',
    '#FF745E',
    '#FFA35E',
    '#FC71FF',
    '#FFC701',
    '#0038FF',
    '#C3FF2B',
    '#FFE62B',
    '#FF4646',
    '#FFBB2B',
  ];

  loginEmailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  loginPasswordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  resetEmailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  nameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  phoneFormControl = new FormControl('', Validators.required);
  locationsEUFormControl = new FormControl('', Validators.required);
  locationsUAFormControl = new FormControl('', Validators.required);
  vehicleFormControl = new FormControl('', Validators.required);
  goodsFormControl = new FormControl('', Validators.required);
  matcher = new ErrorStateMatcher();

  auth = getAuth();
  passwordRecovery: boolean;
  signUp: boolean = false;
  driver: boolean = false;
  supplier: boolean = false;
  loginError: boolean = false;
  resetError: boolean = false;
  resetSuccess: boolean = false;
  changePassword: boolean = false;
  passwordError: boolean = false;
  changePasswordSuccess: boolean = false;

  compileProfile() {
    if (this.driver) {
      return {
        name: this.nameFormControl.value,
        email: this.emailFormControl.value,
        tel: this.phoneFormControl.value,
        from: this.locationsEUFormControl.value,
        to: this.locationsUAFormControl.value,
        vehicle: this.vehicleFormControl.value,
        goods: this.goodsFormControl.value,
        reviews: [],
      };
    } else if (this.supplier) {
      return {
        name: this.nameFormControl.value,
        email: this.emailFormControl.value,
        tel: this.phoneFormControl.value,
        from: this.locationsEUFormControl.value,
        to: this.locationsUAFormControl.value,
        goods: this.goodsFormControl.value,
        reviews: [],
      };
    } else {
      return null;
    }
  }

  async createAuthentication() {
    let email = this.emailFormControl.value;
    let password = this.passwordFormControl.value;
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        this.postUserProfile(user.uid);
        this.firebaseSignIn(email, password);
        sendEmailVerification(this.auth.currentUser);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  async logIn() {
    let email = this.loginEmailFormControl.value;
    let password = this.loginPasswordFormControl.value;

    this.firebaseSignIn(email, password);
  }

  firebaseSignIn(email, password) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.router.navigate(['/home/dash']);
        this.loginError = false;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        this.loginError = true;
      });
  }

  async postUserProfile(uid) {
    let userData = this.saveUserProfile(uid);
    let userDoc = doc(this.FirebaseService.userColl, uid);
    await setDoc(userDoc, userData)
      .catch((err) => {
        console.error(err);
      })
      .then((docRef: any) => {
        console.log(userData);
      });
  }

  saveUserProfile(uid) {
    return {
      profile: this.compileProfile(),
      favorites: [],
      id: uid,
      driver: this.driver,
      img: 'assets/img/blank.png',
    };
  }

  updateEmail(email) {
    updateEmail(this.auth.currentUser, email)
      .then(() => {
        console.log('User Email has been changed to:', email);
        this.FirebaseService.updateCurrentUser();
        sendEmailVerification(this.auth.currentUser);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  sendRecoveryMail() {
    let email = this.resetEmailFormControl.value;
    sendPasswordResetEmail(this.auth, email)
      .then(() => {
        this.passwordRecovery = false;
        this.resetSuccess = true;
        setTimeout(() => {
          this.resetSuccess = false;
        }, 2000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.resetError = true;
      });
  }

  updatePassword() {
    const newPassword = this.passwordFormControl.value;

    updatePassword(this.auth.currentUser, newPassword)
      .then(() => {
        this.changePassword = false;
        this.changePasswordSuccess = true
        setTimeout(() => {
          this.changePasswordSuccess = false
        }, 2000);
      })
      .catch((error) => {
        this.passwordError = true;
      });
  }
}
