import { Component, OnInit } from '@angular/core';
import { Posts } from '../models/posts';
import { TimelineService } from '../services/timeline.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
})
export class TimelineComponent implements OnInit {
  isLoading: boolean = false;
  constructor(private timeline: TimelineService) {}
  image: string = 'https://material.angular.io/assets/img/examples/shiba1.jpg';
  showcomments: boolean = false;
  classApplied = false;
  start: number = 0;
  posts: Posts[] = [];

  ngOnInit(): void {
    this.getposts();
    this.posts.forEach((post) => {
      post.showcomment = false;
    });
    window.addEventListener('scroll', this.scrollHandler, true);
  }
  scrollHandler = (): void => {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight && !this.isLoading) {
      this.isLoading = true;
      this.start += 1;
      const lastPostIndex = this.posts.length - 1;
      const date = this.posts[lastPostIndex].createdAt;
      console.log(date);

      this.timeline.getMorePosts(this.start, date).subscribe((res) => {
        if (res.data.length) {
          this.posts.push(...res.data);
          console.log(this.posts);
          this.isLoading = false;
        }
      });
    }
  };

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollHandler, true);
  }
  onPostCreated(response: any): void {
    // Handle the postCreated event emitted from the child component
    console.log('Received post creation response:', response);
    this.posts.unshift(response); // Push the response to the first element of the array
    // Further actions with the response...
  }

  getposts() {
    this.start += 1;
    this.timeline.getPosts(this.start).subscribe((res) => {
      this.posts.push(...res.data);
      console.log(this.posts);
    });
  }

  toggleClass() {
    this.classApplied = !this.classApplied;
  }
}
