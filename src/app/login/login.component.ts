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
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
 

  constructor(public loginService: LoginServiceService) {}
}
