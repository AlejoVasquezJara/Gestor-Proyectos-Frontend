import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiderviewComponent } from './liderview.component';

describe('LiderviewComponent', () => {
  let component: LiderviewComponent;
  let fixture: ComponentFixture<LiderviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiderviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiderviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
