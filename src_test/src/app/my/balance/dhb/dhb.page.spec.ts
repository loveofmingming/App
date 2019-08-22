import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DhbPage } from './dhb.page';

describe('DhbPage', () => {
  let component: DhbPage;
  let fixture: ComponentFixture<DhbPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DhbPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DhbPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
