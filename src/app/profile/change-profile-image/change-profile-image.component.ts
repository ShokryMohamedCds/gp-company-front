import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { CompanyService } from 'src/app/services/company.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-profile-image',
  templateUrl: './change-profile-image.component.html',
  styleUrls: ['./change-profile-image.component.css'],
})
export class ChangeProfileImageComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private user: UserService,
    private company: CompanyService
  ) {}
  @Input() image?: string;
  // Image URL from the backend
  // Image file to upload
  imageFile: File | undefined;
  // Flag to show/hide delete icon
  showDeleteIcon: boolean = false;
  ngOnInit(): void {}
  onImageSelected(event: any) {
    if (event.target && event.target.files) {
      this.imageFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.image = reader.result.toString();
        }
      };
      if (this.imageFile) {
        reader.readAsDataURL(this.imageFile);
      }
    }
  }

  // Upload new image to backend
  onEditImage() {
    if (this.imageFile) {
      console.log(this.imageFile);
      const formData = new FormData();
      formData.append('companyImage', this.imageFile);
      this.user.postImage(formData).subscribe(
        (data: any) => {
          // Handle successful response
          console.log(data);
          Swal.fire('Good job!', 'Your Image Updated Successfully', 'success');

          this.image = data.image;
        },
        (error: any) => {
          // Handle error
          console.log('An error occurred:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'There is error while uploading your image',
          });
        }
      );
      let userData = JSON.parse(localStorage.getItem('userData') || '{}');
      userData.image = this.image;

      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }

  // Delete image from backend
  onDeleteImage() {
    this.company.onDeleteImage().subscribe((data: any) => {
      console.log(data);
      let userData = JSON.parse(localStorage.getItem('userData') || '{}');
      userData.image = '';
      localStorage.setItem('userData', JSON.stringify(userData));

      this.image = '';
      Swal.fire('Good job!', 'Your Image Removed Successfully', 'success');
    });
  }

  // Show delete icon when hovering over avatar
  onMouseOver() {
    this.showDeleteIcon = true;
  }

  // Hide delete icon when not hovering over avatar
  onMouseOut() {
    this.showDeleteIcon = false;
  }
}
