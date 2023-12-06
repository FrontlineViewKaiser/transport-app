import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getDownloadURL } from '@angular/fire/storage';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(public storage: AngularFireStorage) { }

  uploadFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const path = `profile_pictures/${Date.now()}_${file.name}`;
      const fileRef = this.storage.ref(path);
      const task = this.storage.upload(path, file);

      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(downloadURL => {
            resolve(downloadURL);
          });
        })
      ).subscribe();
    });
  }

}
