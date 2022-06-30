import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigAlternativePublicComponent } from './big-alternative-public.component';

describe('BigAlternativePublicComponent', () => {
  let component: BigAlternativePublicComponent;
  let fixture: ComponentFixture<BigAlternativePublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BigAlternativePublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BigAlternativePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
