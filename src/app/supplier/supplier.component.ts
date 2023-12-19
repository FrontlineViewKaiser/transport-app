import { Component } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { LoginServiceService } from '../login-service.service';
import { DisplayService } from '../display.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
})
export class SupplierComponent {

  filterSelect: boolean = false;


  constructor(
    public loginService: LoginServiceService,
    public displayService: DisplayService
  ) {
  }

  ngOnDestroy() {
    this.displayService.resetFilters();
  }
  

}
