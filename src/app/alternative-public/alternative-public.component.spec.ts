import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternativePublicComponent } from './alternative-public.component';

describe('AlternativePublicComponent', () => {
  let component: AlternativePublicComponent;
  let fixture: ComponentFixture<AlternativePublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlternativePublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternativePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
