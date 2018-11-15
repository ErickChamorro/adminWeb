import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesformComponent } from './planesform.component';

describe('PlanesformComponent', () => {
  let component: PlanesformComponent;
  let fixture: ComponentFixture<PlanesformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanesformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanesformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
