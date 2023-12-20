import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReauthentificationDialogComponent } from './reauthentification-dialog.component';

describe('ReauthentificationDialogComponent', () => {
  let component: ReauthentificationDialogComponent;
  let fixture: ComponentFixture<ReauthentificationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReauthentificationDialogComponent]
    });
    fixture = TestBed.createComponent(ReauthentificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
