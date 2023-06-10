import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostResultsDialogComponent } from './job-post-results-dialog.component';

describe('JobPostResultsDialogComponent', () => {
  let component: JobPostResultsDialogComponent;
  let fixture: ComponentFixture<JobPostResultsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobPostResultsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobPostResultsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
