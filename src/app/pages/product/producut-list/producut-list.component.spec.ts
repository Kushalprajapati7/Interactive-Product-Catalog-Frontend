import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducutListComponent } from './producut-list.component';

describe('ProducutListComponent', () => {
  let component: ProducutListComponent;
  let fixture: ComponentFixture<ProducutListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProducutListComponent]
    });
    fixture = TestBed.createComponent(ProducutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
