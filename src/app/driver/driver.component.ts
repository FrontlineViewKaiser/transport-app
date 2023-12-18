import { Component } from '@angular/core';
import { DetailDialogueComponent } from '../detail-dialogue/detail-dialogue.component';
import { ContactDialogueComponent } from '../contact-dialogue/contact-dialogue.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FirebaseService } from '../firebase.service';
import { Subscription } from 'rxjs';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss'],
})
export class DriverComponent {
  DetailDialogue = DetailDialogueComponent;
  ContactDialogue = ContactDialogueComponent;
  subscription;
  filterSelect: boolean = false;
  drivers = [];
  allDrivers = [];
  searchQuery: string = '';
  selectedLocationFrom: string[] = [];
  selectedLocationTo: string[] = [];
  selectedVehicles: string[] = [];
  selectedGoods: string[] = [];

  constructor(
    public dialog: MatDialog,
    public FirebaseService: FirebaseService,
    public loginService: LoginServiceService
  ) {
    this.subscription = this.FirebaseService.UserSubscription().subscribe(
      (users) => {
        this.allDrivers = (users as any[]).filter(
          (user) => user.driver === true
        );
        this.search()
      }
    );
  }

  openDialog(component, driver) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      driver: driver,
    };
    this.dialog.open(component, dialogConfig);
  }
  search() {
    if (this.searchQuery != '') {
      this.drivers = this.allDrivers.filter((supplier) =>
        supplier.profile.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.drivers = [...this.allDrivers];
    }
  }

  filterSuppliers() {
    this.drivers = this.allDrivers.filter((driver) => {
      const matchesLocationFrom = this.selectedLocationFrom.length
        ? this.selectedLocationFrom.every((from) =>
            driver.profile.from.includes(from)
          )
        : true;

      const matchesLocationTo = this.selectedLocationTo.length
        ? this.selectedLocationTo.every((to) => driver.profile.to.includes(to))
        : true;

      const matchesVehicles = this.selectedVehicles.length
        ? this.selectedVehicles.every((vehicle) =>
            driver.profile.vehicle.includes(vehicle)
          )
        : true;

      const matchesGoods = this.selectedGoods.length
        ? this.selectedGoods.every((good) =>
            driver.profile.goods.includes(good)
          )
        : true;

      return (
        matchesLocationFrom &&
        matchesLocationTo &&
        matchesVehicles &&
        matchesGoods
      );
    });
  }

  toggleFavorite(id) {
    let user = this.FirebaseService.currentUser;

    if (user.favorites.includes(id)) {

      user.favorites = user.favorites.filter(favoriteId => favoriteId !== id);
    } else {
      user.favorites.push(id);
    }

    this.FirebaseService.updateCurrentUser()
  }

  favorite(id) {
    let user = this.FirebaseService.currentUser
    return user.favorites.includes(id)
  }

}
