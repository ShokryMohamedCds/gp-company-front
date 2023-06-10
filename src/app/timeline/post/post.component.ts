import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AllcommentsComponent } from '../allcomments/allcomments.component';
import { Posts } from 'src/app/models/posts';
import { TimelineService } from 'src/app/services/timeline.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private timeline: TimelineService
  ) {}

  @Input() posts!: Posts[];
  showcomments: boolean = false;
  ngOnInit(): void {}
  noimage: string = 'https://via.placeholder.com/150x150.png?text=No+Image';
  classApplied = false;
  checkoutForm = this.formBuilder.group({
    Comment: '',
  });
  newComments: any = [];

  toggleClass(post: Posts) {
    post.isLiked = !post.isLiked;
    this.timeline.like(post._id).subscribe((res) => {
      console.log(res);
    });
  }
  toggleComment(post: Posts) {
    post.showcomment = !post.showcomment;
  }
  onSubmit(): void {
    // Process checkout data here
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }
  onCommentAdded(comment: any) {
    // Update the post with the new comment
    // This will automatically reflect in the view and show the new comment in real-time
    let index = this.posts.findIndex((obj) => obj._id === comment._id);
    this.posts[index].comments.push(
      comment.comments[comment.comments.length - 1]
    );
    this.newComments.push(comment.comments[comment.comments.length - 1]);
    console.log(comment.comments[comment.comments.length - 1]);
    console.log(this.newComments);
  }

  openDialog(post: Posts) {
    const dialogRef = this.dialog.open(AllcommentsComponent, {
      width: '80%',
      data: {
        post: post,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(post);

      console.log(`Dialog result: ${result}`);
    });
  }
}
