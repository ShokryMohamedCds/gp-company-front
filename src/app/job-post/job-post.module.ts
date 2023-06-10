import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { JobPostRoutingModule } from './job-post-routing.module';
import { JobPostComponent } from './job-post.component';
import { CVSComponent } from './cvs/cvs.component';
import { JobPostResultsDialogComponent } from './job-post-results-dialog/job-post-results-dialog.component';

@NgModule({
  declarations: [JobPostComponent, CVSComponent, JobPostResultsDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    JobPostRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class JobPostModule {}
