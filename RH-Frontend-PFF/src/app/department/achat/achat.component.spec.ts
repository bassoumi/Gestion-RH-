import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchatComponent } from './achat.component';

describe('AchatComponent', () => {
  let component: AchatComponent;
  let fixture: ComponentFixture<AchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AchatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
