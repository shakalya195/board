import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GotiComponent } from './goti.component';

describe('GotiComponent', () => {
  let component: GotiComponent;
  let fixture: ComponentFixture<GotiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GotiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GotiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
