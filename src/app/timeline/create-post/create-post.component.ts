import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TimelineService } from 'src/app/services/timeline.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  postForm!: FormGroup;
  selectedImage: string | null = null;
  @Output() postCreated: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private timelineService: TimelineService
  ) {}

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      content: '',
      image: null,
    });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const content = this.postForm.get('content')?.value;
      const image = this.postForm.get('image')?.value;

      if (typeof image === 'string') {
        console.error('Invalid image file');
        return;
      }

      this.timelineService.sendPost(content, image).subscribe(
        (response) => {
          console.log('Post created:', response);
          this.postForm.reset();
          this.selectedImage = null;
          this.postCreated.emit(response); // Emit the response to the parent component
          Swal.fire('Good job!', 'Your Post Added Successfully', 'success');
        },
        (error) => {
          console.error('Error creating post:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong while adding your post!',
          });
        }
      );
    }
  }

  onImageSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.postForm.get('image')?.setValue(file);

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
