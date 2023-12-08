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
import { finalize } from 'rxjs';
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

  uploadFile(input: HTMLInputElement) {
    if (!input.files) return;

    const files: FileList = input.files;

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const storageRef = ref(this.storage, file.name);
        uploadBytesResumable(storageRef, file);
        console.log(storageRef);
      }
    }
  }

  downloadFile() {
    let userRef = this.firebaseService.currentUser.profile.img;
    let placeholder = 'assets/img/blank.png';
    if (userRef != '') {
      let imgRef = ref(this.storage, userRef);
      getDownloadURL(imgRef).then((url) => {
       return url;
      });
    } else {
      return
    }
  }
}
