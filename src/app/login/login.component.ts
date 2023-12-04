import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective, NgForm, FormsModule } from '@angular/forms';
import { addDoc, doc, setDoc } from '@angular/fire/firestore';
import { FirebaseService } from '../firebase.service';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Router } from '@angular/router';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private FirebaseService: FirebaseService,
    private router: Router
  ) {}

  signUp: boolean = false;
  driver: boolean = false;
  supplier: boolean = false;

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

  async createUser() {
    this.createAuthentication();
    this.saveUserProfile();

    this.signUp = false;
    this.driver = false;
    this.supplier = false;
  }

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

  getColor(name) {
    const sum = name
      .split('')
      .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const colorIndex = sum % this.colors.length;
    return this.colors[colorIndex];
  }

  async createAuthentication() {
    let email = this.emailFormControl.value;
    let password = this.passwordFormControl.value;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.router.navigate(['/home/dash']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  async logIn() {
    let email = this.emailFormControl.value;
    let password = this.passwordFormControl.value;
    let auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('User created successfully', userCredential);
      this.router.navigate(['/home/dash']);
    } catch (error) {
      console.error('Error creating authenticated user', error);
    }
  }

  saveUserProfile() {
    let userData = {
      profile: this.compileProfile(),
      favorites: [],
      color: this.getColor(this.nameFormControl.value),
      id: '',
      driver: this.driver,
    };

    this.postUserProfile(userData);
  }

  async postUserProfile(userData) {
    let uid = Credential.user.uid;
    let userDoc = doc(this.FirebaseService.userColl, `users/${user.uid}`)
    await setDoc(userDoc, userData)
    .catch((err) => {
        console.error(err);
      })
      .then((docRef: any) => {
        console.log(this.compileProfile());
      });
  }
}
