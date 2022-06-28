import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectangularBlockComponent } from './rectangular-block.component';

describe('RectangularBlockComponent', () => {
  let component: RectangularBlockComponent;
  let fixture: ComponentFixture<RectangularBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RectangularBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RectangularBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
