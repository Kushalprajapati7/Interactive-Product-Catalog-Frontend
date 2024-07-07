import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducutAddEditComponent } from './producut-add-edit.component';

describe('ProducutAddEditComponent', () => {
  let component: ProducutAddEditComponent;
  let fixture: ComponentFixture<ProducutAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProducutAddEditComponent]
    });
    fixture = TestBed.createComponent(ProducutAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
