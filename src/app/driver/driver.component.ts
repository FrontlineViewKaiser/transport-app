import { Component } from '@angular/core';
import { LoginServiceService } from '../login-service.service';
import { DisplayService } from '../display.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss'],
})
export class DriverComponent {
  subscription;
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
