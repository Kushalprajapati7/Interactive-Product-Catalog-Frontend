import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducutDetailsComponent } from './producut-details.component';

describe('ProducutDetailsComponent', () => {
  let component: ProducutDetailsComponent;
  let fixture: ComponentFixture<ProducutDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProducutDetailsComponent]
    });
    fixture = TestBed.createComponent(ProducutDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
