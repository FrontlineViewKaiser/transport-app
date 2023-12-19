import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild('drawer') drawer: MatDrawer;

  CUSTOM_BREAKPOINTS = {
    mobile: '(max-width: 859px)',
    desktop: '(min-width: 860px)',
  };

  constructor(
    public FirebaseService: FirebaseService,
    private breakpointObserver: BreakpointObserver,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.breakpointObserver
      .observe([
        this.CUSTOM_BREAKPOINTS.mobile,
        this.CUSTOM_BREAKPOINTS.desktop,
      ])
      .subscribe((result) => {
        if (result.breakpoints[this.CUSTOM_BREAKPOINTS.mobile]) {
          this.drawer.opened = false;
          this.drawer.mode = 'over';
        } else {
          this.drawer.opened = true;
          this.drawer.mode = 'side';
        }
        this.changeDetectorRef.detectChanges();
      });
  }
}
