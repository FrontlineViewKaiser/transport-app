import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDialogueComponent } from './detail-dialogue.component';

describe('DetailDialogueComponent', () => {
  let component: DetailDialogueComponent;
  let fixture: ComponentFixture<DetailDialogueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailDialogueComponent]
    });
    fixture = TestBed.createComponent(DetailDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
