import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  noimage: string = 'https://via.placeholder.com/150x150.png?text=No+Image';

  constructor() {}
  @Input() comment?: any[];
  @Input() newComments?: any[];
  commentsList: any[] = [];

  ngOnInit(): void {
    // Combine the comment and newComments arrays
  }
}
