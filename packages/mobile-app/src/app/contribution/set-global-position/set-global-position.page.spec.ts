import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetGlobalPositionPage } from './set-global-position.page';

describe('SetGlobalPositionPage', () => {
  let component: SetGlobalPositionPage;
  let fixture: ComponentFixture<SetGlobalPositionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetGlobalPositionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetGlobalPositionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
