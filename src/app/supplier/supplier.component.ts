import { Component } from '@angular/core';
import { DetailDialogueComponent } from '../detail-dialogue/detail-dialogue.component';
import { ContactDialogueComponent } from '../contact-dialogue/contact-dialogue.component';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from '../firebase.service';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
})
export class SupplierComponent {
  DetailDialogue = DetailDialogueComponent;
  ContactDialogue = ContactDialogueComponent;
  suppliers = [];
  allSuppliers = [];
  subscription: any;
  filterSelect: boolean = false;
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
        this.allSuppliers = (users as any[]).filter(
          (user) => user.driver === false
        );
        this.search();
      }
    );
  }

  search() {
    if (this.searchQuery != '') {
      this.suppliers = this.allSuppliers.filter((supplier) =>
        supplier.profile.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.suppliers = [...this.allSuppliers];
    }
  }

  openDialog(component) {
    this.dialog.open(component);
  }

  filterSuppliers() {
    this.suppliers = this.allSuppliers.filter((supplier) => {
      const matchesLocationFrom = this.selectedLocationFrom.length
        ? this.selectedLocationFrom.every((from) =>
            supplier.profile.from.includes(from)
          )
        : true;

      const matchesLocationTo = this.selectedLocationTo.length
        ? this.selectedLocationTo.every((to) =>
            supplier.profile.to.includes(to)
          )
        : true;

      const matchesVehicles = this.selectedVehicles.length
        ? this.selectedVehicles.every((vehicle) =>
            supplier.profile.vehicles.includes(vehicle)
          )
        : true;

      const matchesGoods = this.selectedGoods.length
        ? this.selectedGoods.every((good) =>
            supplier.profile.goods.includes(good)
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
}
