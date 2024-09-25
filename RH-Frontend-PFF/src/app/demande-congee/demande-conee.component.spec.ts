import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeConeeComponent } from './demande-conee.component';

describe('DemandeConeeComponent', () => {
  let component: DemandeConeeComponent;
  let fixture: ComponentFixture<DemandeConeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeConeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeConeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
