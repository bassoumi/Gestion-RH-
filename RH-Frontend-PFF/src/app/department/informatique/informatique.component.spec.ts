import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformatiqueComponent } from './informatique.component';

describe('InformatiqueComponent', () => {
  let component: InformatiqueComponent;
  let fixture: ComponentFixture<InformatiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformatiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformatiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
