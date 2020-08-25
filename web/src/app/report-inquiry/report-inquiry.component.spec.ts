import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInquiryComponent } from './report-inquiry.component';

describe('ReportInquiryComponent', () => {
  let component: ReportInquiryComponent;
  let fixture: ComponentFixture<ReportInquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportInquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
