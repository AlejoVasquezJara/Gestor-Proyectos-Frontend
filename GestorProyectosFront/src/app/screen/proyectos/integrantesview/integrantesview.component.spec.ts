import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrantesviewComponent } from './integrantesview.component';

describe('IntegrantesviewComponent', () => {
  let component: IntegrantesviewComponent;
  let fixture: ComponentFixture<IntegrantesviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntegrantesviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntegrantesviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
