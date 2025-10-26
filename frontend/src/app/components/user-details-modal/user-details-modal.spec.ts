import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsModalComponent } from './user-details-modal.component';

describe('UserDetailsModal', () => {
  let component: UserDetailsModalComponent;
  let fixture: ComponentFixture<UserDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailsModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
