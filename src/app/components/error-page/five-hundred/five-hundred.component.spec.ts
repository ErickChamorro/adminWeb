import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveHundredComponent } from './five-hundred.component';

describe('FiveHundredComponent', () => {
  let component: FiveHundredComponent;
  let fixture: ComponentFixture<FiveHundredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiveHundredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiveHundredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
