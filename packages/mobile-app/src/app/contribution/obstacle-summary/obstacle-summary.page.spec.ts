import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObstacleSummaryPage } from './obstacle-summary.page';

describe('ObstacleSummaryPage', () => {
  let component: ObstacleSummaryPage;
  let fixture: ComponentFixture<ObstacleSummaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObstacleSummaryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObstacleSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
