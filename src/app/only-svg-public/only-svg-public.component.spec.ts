import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlySvgPublicComponent } from './only-svg-public.component';

describe('OnlySvgPublicComponent', () => {
  let component: OnlySvgPublicComponent;
  let fixture: ComponentFixture<OnlySvgPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlySvgPublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlySvgPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
