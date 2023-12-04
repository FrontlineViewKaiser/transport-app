import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  userStatus = 'supplier';
  constructor(private router: Router) {}

  goToFavourites() {
    if (this.userStatus == 'supplier') {
      this.router.navigateByUrl('driver');
    } else {
      this.router.navigateByUrl('supplier');
    }
  }

}
