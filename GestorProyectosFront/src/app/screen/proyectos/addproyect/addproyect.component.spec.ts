import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproyectComponent } from './addproyect.component';

describe('AddproyectComponent', () => {
  let component: AddproyectComponent;
  let fixture: ComponentFixture<AddproyectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddproyectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddproyectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
