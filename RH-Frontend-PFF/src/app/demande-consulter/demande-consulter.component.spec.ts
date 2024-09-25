import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeConsulterComponent } from './demande-consulter.component';

describe('DemandeConsulterComponent', () => {
  let component: DemandeConsulterComponent;
  let fixture: ComponentFixture<DemandeConsulterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeConsulterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeConsulterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
