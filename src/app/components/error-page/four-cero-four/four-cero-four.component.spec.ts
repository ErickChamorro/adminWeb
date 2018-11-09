import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FourCeroFourComponent } from './four-cero-four.component';

describe('FourCeroFourComponent', () => {
  let component: FourCeroFourComponent;
  let fixture: ComponentFixture<FourCeroFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FourCeroFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourCeroFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
