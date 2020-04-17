import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustmarkHomeComponent } from './trustmark-home.component';

describe('TrustmarkHomeComponent', () => {
  let component: TrustmarkHomeComponent;
  let fixture: ComponentFixture<TrustmarkHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrustmarkHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustmarkHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
