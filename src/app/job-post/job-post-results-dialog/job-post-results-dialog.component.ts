import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-job-post-results-dialog',
  templateUrl: './job-post-results-dialog.component.html',
  styleUrls: ['./job-post-results-dialog.component.css'],
})
export class JobPostResultsDialogComponent {
  offerForm: FormGroup;
  offerTypeOptions: string[] = [
    'General Interview',
    'Technical Interview',
    'HR Interview',
    'Job Offer',
  ];
  constructor(
    private dialogRef: MatDialogRef<JobPostResultsDialogComponent>,
    private formBuilder: FormBuilder,
    private company: CompanyService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.offerForm = this.formBuilder.group({
      offerContent: ['', Validators.required],
      offerType: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.offerForm.valid) {
      const formData = this.offerForm.value;
      formData.jobId = this.data.jobId; // Access the jobId from the data object passed to the dialog
      formData.userId = this.data.userId; // Access the userId from the data object passed to the dialog

      this.company.sendJobOffer(formData).subscribe(
        (response) => {
          console.log('Job offer sent:', response);
          Swal.fire('Good job!', 'Job Offer Sent Successfully', 'success');
          // Handle the success response here
        },
        (error) => {
          console.error('Error sending job offer:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Cant Send this Job Offer',
          });
          // Handle the error response here
        }
      );

      this.dialogRef.close(true); // Close the dialog after submitting the form
    }
  }
}
