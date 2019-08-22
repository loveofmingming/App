import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplainPage } from './explain.page';

describe('DetailsPage', () => {
  let component: ExplainPage;
  let fixture: ComponentFixture<ExplainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplainPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
