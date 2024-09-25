import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterLesFormationsComponent } from './consulter-les-formations.component';

describe('ConsulterLesFormationsComponent', () => {
  let component: ConsulterLesFormationsComponent;
  let fixture: ComponentFixture<ConsulterLesFormationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterLesFormationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsulterLesFormationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
