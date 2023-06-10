import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import Swal from 'sweetalert2';
import { JobPostResultsDialogComponent } from '../job-post-results-dialog/job-post-results-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cvs',
  templateUrl: './cvs.component.html',
  styleUrls: ['./cvs.component.css'],
})
export class CVSComponent implements OnInit {
  users: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.getJobPostDetails(id);
    }
  }
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'title',
    'rank',
    'actions',
  ];

  viewCV(cvUrl: string) {
    // Open the CV URL in a new page
    if (cvUrl) {
      window.open(cvUrl, '_blank');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There is No CV for this user',
      });
    }
  }

  openDialog(item: any) {
    const userId = item.userId._id;
    const jobId = item._id;
    const dialogRef = this.dialog.open(JobPostResultsDialogComponent, {
      data: { jobId, userId }, // Pass the jobId and userId to the dialog component
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Handle the result from the dialog if needed
        console.log(result);
      }
    });
  }

  getJobPostDetails(id: string) {
    this.companyService.getJobPostById(id).subscribe(
      (response) => {
        // Handle the API response here
        this.users = response.matchedUsers;
      },
      (error) => {
        // Handle the API error here
      }
    );
  }
}
