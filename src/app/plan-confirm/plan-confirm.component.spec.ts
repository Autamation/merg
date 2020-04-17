import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanConfirmComponent } from './plan-confirm.component';

describe('PlanConfirmComponent', () => {
  let component: PlanConfirmComponent;
  let fixture: ComponentFixture<PlanConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
