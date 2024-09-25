import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeIntersseeComponent } from './employee-interssee.component';

describe('EmployeeIntersseeComponent', () => {
  let component: EmployeeIntersseeComponent;
  let fixture: ComponentFixture<EmployeeIntersseeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeIntersseeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeIntersseeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
