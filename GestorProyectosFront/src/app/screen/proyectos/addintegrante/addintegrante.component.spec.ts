import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddintegranteComponent } from './addintegrante.component';

describe('AddintegranteComponent', () => {
  let component: AddintegranteComponent;
  let fixture: ComponentFixture<AddintegranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddintegranteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddintegranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
