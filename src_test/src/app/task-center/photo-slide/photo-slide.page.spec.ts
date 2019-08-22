import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoSlidePage } from './photo-slide.page';

describe('PhotoSlidePage', () => {
  let component: PhotoSlidePage;
  let fixture: ComponentFixture<PhotoSlidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoSlidePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoSlidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
