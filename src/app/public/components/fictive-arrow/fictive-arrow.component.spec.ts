import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FictiveArrowComponent } from './fictive-arrow.component';

describe('FictiveArrowComponent', () => {
  let component: FictiveArrowComponent;
  let fixture: ComponentFixture<FictiveArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FictiveArrowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FictiveArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
