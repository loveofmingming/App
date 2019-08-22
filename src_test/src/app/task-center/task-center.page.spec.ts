import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCenterPage } from './task-center.page';

describe('TaskCenterPage', () => {
  let component: TaskCenterPage;
  let fixture: ComponentFixture<TaskCenterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskCenterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
