import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerferedUsersComponent } from './perfered-users.component';

describe('PerferedUsersComponent', () => {
  let component: PerferedUsersComponent;
  let fixture: ComponentFixture<PerferedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerferedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerferedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
