import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneWayArrowComponent } from './one-way-arrow.component';

describe('OneWayArrowComponent', () => {
  let component: OneWayArrowComponent;
  let fixture: ComponentFixture<OneWayArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneWayArrowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneWayArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
