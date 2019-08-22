import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickablesPage } from './pickables.page';

describe('PickablesPage', () => {
  let component: PickablesPage;
  let fixture: ComponentFixture<PickablesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickablesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickablesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
