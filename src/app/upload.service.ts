import { Component, Injectable, inject } from '@angular/core';
import {
  getStorage,
  provideStorage,
  ref,
  uploadBytesResumable,
  Storage,
  StorageReference,
  getDownloadURL,
} from '@angular/fire/storage';
import { BehaviorSubject, finalize, take } from 'rxjs';
import { FirebaseService } from './firebase.service';

@Component({
  selector: 'app-storage',
  template: `
    <h1>Storage</h1>
    <label for="fileUpload">Choose a File</label>
    <input id="fileUpload" type="file" #upload />
    <button (click)="uploadFile(upload)">Upload</button>
  `,
})
@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private readonly storage: Storage = inject(Storage);
  private firebaseService: FirebaseService = inject(FirebaseService);

  currentUser$ = this.firebaseService.currentUserSubject.asObservable();


  uploadFile(input: HTMLInputElement) {
    if (!input.files) return;

    const files: FileList = input.files;

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const storageRef = ref(this.storage, file.name);
        uploadBytesResumable(storageRef, file);
        console.log(storageRef.fullPath);
        this.firebaseService.currentUser.img = storageRef.fullPath;
        this.firebaseService.updateCurrentUser();
      }
    }
  }

  downloadFile(id) {
    const img = document.getElementById(id);
    this.currentUser$.pipe(take(1)).subscribe((currentUser) => {
      if (currentUser != null && currentUser.img != '') {
        let imgRef = ref(this.storage, currentUser.img);
        getDownloadURL(imgRef).then((url) => {
          console.log(url);
          img.setAttribute('src', url);
        });
      } else {
        img.setAttribute('src', 'assets/img/blank.png');
      }
    });
  }
}
