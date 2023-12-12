import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  subscription: any;
  favourites = [];
  drivers = [];
  suppliers = [];

  constructor(private router: Router, public FirebaseService: FirebaseService) {
    this.subscription = this.FirebaseService.UserSubscription().subscribe(
      (users) => {
        this.suppliers = (users as any[]).filter(
          (user) => user.driver === false
        );
        this.drivers = (users as any[]).filter((user) => user.driver === true);
      }
    );
    console.log(this.FirebaseService.currentUserSubject);
  }

  ngAfterContentInit() {
    this.adjustGreeting();
  }

  getFavourites(currentUser) {
    let favorites;
    if (currentUser.driver == false) {
      currentUser.favorites.forEach((favorite) => {
        favorites = (this.drivers as any[]).filter(
          (driver) => driver.id === favorite
        );
      });
    } else {
      currentUser.favorites.forEach((favorite) => {
        favorites = (this.suppliers as any[]).filter(
          (supplier) => supplier.id === favorite
        );
      });
    }
    return favorites.length;
  }

  goToFavourites() {
    const currentUser = this.FirebaseService.currentUserSubject.value;
    if (currentUser.driver == false) {
      this.router.navigateByUrl('/home/driver');
    } else {
      this.router.navigateByUrl('/home/supplier');
    }
  }

  displayFavorites() {
    const currentUser = this.FirebaseService.currentUserSubject.value;
    if (currentUser) {
      if (currentUser.favorites.length > 0) {
        return `${this.getFavourites(currentUser)} Favorites`;
      } else {
        return 'No Favorites yet...';
      }
    }
    return 'No Favorites yet...';
  }

  adjustGreeting() {
    const currentUser = this.FirebaseService.currentUserSubject.value;
    let hour = new Date().getHours();
    let greeting;
    if (hour >= 17) {
      greeting = `Добрий вечір`; // Good evening
    } else if (hour >= 14) {
      greeting = `Добрий день`; // Good afternoon
    } else if (hour >= 11) {
      greeting = `Ласкаво просимо`; // Welcome
    } else if (hour >= 6) {
      greeting = `Доброго ранку`; // Good morning
    } else if (hour >= 0) {
      greeting = `Не годуйте Гремлінів`; // Don't feed the Gremlins
    }
    return greeting;
  }

  

}
