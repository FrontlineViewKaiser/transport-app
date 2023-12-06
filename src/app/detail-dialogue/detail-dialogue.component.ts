import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-dialogue',
  templateUrl: './detail-dialogue.component.html',
  styleUrls: ['./detail-dialogue.component.scss']
})
export class DetailDialogueComponent {
  constructor(
    public dialogRef: MatDialogRef<DetailDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
