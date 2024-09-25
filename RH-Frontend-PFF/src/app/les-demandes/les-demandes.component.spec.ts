import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LesDemandesComponent } from './les-demandes.component';

describe('LesDemandesComponent', () => {
  let component: LesDemandesComponent;
  let fixture: ComponentFixture<LesDemandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LesDemandesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LesDemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
