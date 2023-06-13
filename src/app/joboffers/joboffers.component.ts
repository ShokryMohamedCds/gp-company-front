import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-joboffers',
  templateUrl: './joboffers.component.html',
  styleUrls: ['./joboffers.component.css'],
})
export class JoboffersComponent implements OnInit {
  users: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    public dialog: MatDialog
  ) {}
  displayedColumns: any[] = [
    'userId',
    'jobId',
    'offerContent',
    'offerType',
    'offerAcceptance',
  ];
  ngOnInit(): void {
    console.log('1');
    this.getJobOffers();
  }
  getJobOffers() {
    this.companyService.getJobOffers().subscribe(
      (response) => {
        // Handle the API response here
        console.log(response);

        this.users = response;
      },
      (error) => {
        // Handle the API error here
      }
    );
  }
}
