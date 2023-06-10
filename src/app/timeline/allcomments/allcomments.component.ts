import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Posts } from 'src/app/models/posts';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-allcomments',
  templateUrl: './allcomments.component.html',
  styleUrls: ['./allcomments.component.css'],
})
export class AllcommentsComponent implements OnInit {
  newComments: any = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit(): void {
    console.log(this.data.post);
  }
  onCommentAdded(comment: any) {
    // Update the post with the new comment
    // This will automatically reflect in the view and show the new comment in real-time
    let index = this.data.post.findIndex(
      (obj: { _id: any }) => obj._id === comment._id
    );
    this.data.post[index].comments.push(
      comment.comments[comment.comments.length - 1]
    );
    this.newComments.push(comment.comments[comment.comments.length - 1]);
    console.log(comment.comments[comment.comments.length - 1]);
    console.log(this.newComments);
  }
}
