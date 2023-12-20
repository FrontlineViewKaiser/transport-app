import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { LoginServiceService } from './login-service.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetailDialogueComponent } from './detail-dialogue/detail-dialogue.component';

@Injectable({
  providedIn: 'root',
})
export class DisplayService {
  subscription;
  currentUserSubscription;
  currentUser;
  filterSelect: boolean = false;
  filterFavorites: boolean = false;
  drivers = [];
  allDrivers = [];
  suppliers = [];
  allSuppliers = [];
  searchQuery: string = '';
  selectedLocationFrom: string[] = [];
  selectedLocationTo: string[] = [];
  selectedVehicles: string[] = [];
  selectedGoods: string[] = [];

  DetailDialogue = DetailDialogueComponent;

  constructor(
    public dialog: MatDialog,
    public FirebaseService: FirebaseService,
    public loginService: LoginServiceService
  ) {
    this.currentUserSubscription =
      this.FirebaseService.currentUserSubject.subscribe((currentUser) => {
        if (currentUser) {
          this.currentUser = currentUser;
          console.log(currentUser);
          this.fetchUsers();
        }
      });
  }

  fetchUsers() {
    this.subscription = this.FirebaseService.UserSubscription().subscribe(
      (users) => {
        this.allSuppliers = (users as any[]).filter(
          (user) => !user.driver && user.id !== this.currentUser.id
        );

        this.allDrivers = (users as any[]).filter(
          (user) => user.driver && user.id !== this.currentUser.id
        );

        this.search('driver');
        this.search('supplier');
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }

  search(userType: 'driver' | 'supplier') {
    let users = userType === 'driver' ? this.allDrivers : this.allSuppliers;

    if (this.searchQuery != '') {
      if (userType === 'driver') {
        this.drivers = users.filter((user) =>
          user.profile.name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.suppliers = users.filter((user) =>
          user.profile.name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
        );
      }
    } else {
      if (userType === 'driver') {
        this.drivers = [...this.allDrivers];
      } else {
        this.suppliers = [...this.allSuppliers];
      }
    }
  }

  applyFilters() {
    this.filterArray('driver');
    this.filterArray('supplier');
  }

  filterForFavorites() {
    this.filterFavorites = !this.filterFavorites;
    this.filterArray('driver');
    this.filterArray('supplier');
  }

  filterArray(userType: 'driver' | 'supplier') {
    const users = userType === 'driver' ? this.allDrivers : this.allSuppliers;
    const filteredUsers = users.filter((user) => {
      const matchesLocationFrom =
        this.selectedLocationFrom.length === 0 ||
        this.selectedLocationFrom.every((from) =>
          user.profile.from.includes(from)
        );
      const matchesLocationTo =
        this.selectedLocationTo.length === 0 ||
        this.selectedLocationTo.every((to) => user.profile.to.includes(to));
      const matchesVehicles =
        userType !== 'driver' ||
        this.selectedVehicles.length === 0 ||
        this.selectedVehicles.every((vehicle) =>
          user.profile.vehicle.includes(vehicle)
        );
      const matchesGoods =
        this.selectedGoods.length === 0 ||
        this.selectedGoods.every((good) => user.profile.goods.includes(good));
      const isFavorite =
        !this.filterFavorites ||
        this.FirebaseService.currentUser.favorites.includes(user.id);

      return (
        matchesLocationFrom &&
        matchesLocationTo &&
        matchesVehicles &&
        matchesGoods &&
        isFavorite
      );
    });

    if (userType === 'driver') {
      this.drivers = filteredUsers;
    } else {
      this.suppliers = filteredUsers;
    }
  }

  toggleFavorite(id) {
    let user = this.FirebaseService.currentUser;

    if (user.favorites.includes(id)) {
      user.favorites = user.favorites.filter((favoriteId) => favoriteId !== id);
    } else {
      user.favorites.push(id);
    }

    this.FirebaseService.updateCurrentUser();
  }

  favorite(id) {
    if (this.FirebaseService.currentUser) {
      let user = this.FirebaseService.currentUser;
      return user.favorites.includes(id);
    }
  }

  openDialog(component, user) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      user: user,
    };
    this.dialog.open(component, dialogConfig);
  }

  resetFilters() {
    this.selectedLocationFrom = [];
    this.selectedLocationTo = [];
    this.selectedVehicles = [];
    this.selectedGoods = [];
    this.filterFavorites = false;

    this.applyFilters();
  }
}
