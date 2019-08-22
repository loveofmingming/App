import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatingPage } from './locating.page';

describe('LocatingPage', () => {
  let component: LocatingPage;
  let fixture: ComponentFixture<LocatingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocatingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
