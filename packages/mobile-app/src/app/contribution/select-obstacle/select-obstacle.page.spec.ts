import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectObstaclePage } from './select-obstacle.page';

describe('SelectObstaclePage', () => {
  let component: SelectObstaclePage;
  let fixture: ComponentFixture<SelectObstaclePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectObstaclePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectObstaclePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
