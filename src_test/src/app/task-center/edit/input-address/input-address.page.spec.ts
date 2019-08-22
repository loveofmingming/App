import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAddressPage } from './input-address.page';

describe('InputAddressPage', () => {
  let component: InputAddressPage;
  let fixture: ComponentFixture<InputAddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputAddressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
