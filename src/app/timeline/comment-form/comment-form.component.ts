import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TimelineService } from 'src/app/services/timeline.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
})
export class CommentFormComponent implements OnInit {
  @Input() post: any;
  @Output() commentAdded = new EventEmitter<any>();

  @ViewChild('commentTextArea') commentTextArea!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private timeline: TimelineService
  ) {}

  ngOnInit(): void {}

  checkoutForm = this.formBuilder.group({
    Comment: '',
  });

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      const comment = this.checkoutForm.get('Comment')?.value;
      console.log(comment);
      this.addComment(comment);
      console.warn('Your order has been submitted', comment);
      this.checkoutForm.reset();
      this.clearCommentTextArea();
    }
  }

  clearCommentTextArea(): void {
    const nativeElement: HTMLTextAreaElement | null =
      this.commentTextArea.nativeElement;
    if (nativeElement) {
      nativeElement.value = '';
    }
  }

  addComment(comment: any) {
    this.timeline.comment(this.post._id, comment).subscribe((res) => {
      console.log(res);
      this.commentAdded.emit(res);
    });
  }
}
