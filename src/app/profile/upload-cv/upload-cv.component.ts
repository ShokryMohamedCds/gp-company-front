import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-upload-cv',
  templateUrl: './upload-cv.component.html',
  styleUrls: ['./upload-cv.component.css'],
})
export class UploadCvComponent {
  selectedFile: any = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  private get httpOptions(): { headers: HttpHeaders } {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userData.token}`,
    });
    return { headers };
  }
  onUpload() {
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('userCV', this.selectedFile);

    this.http
      .post('http://localhost:8042/user/userCV', formData, this.httpOptions)
      .subscribe(
        (response) => {
          alert('Cv Uploaded Seccussfully');
        },
        (error) => {
          alert('cant Upload this CV');
        }
      );
  }
}
