import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Posts } from '../models/posts';
import { CompanyService } from '../services/company.service';
import { Users } from 'src/app/models/users';
import { BehaviorSubject } from 'rxjs';
import { TimelineService } from '../services/timeline.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userID: string | undefined;
  currentuserID: BehaviorSubject<string | undefined> = new BehaviorSubject<
    string | undefined
  >(undefined);
  constructor(
    private route: ActivatedRoute,
    private company: CompanyService,
    private timeline: TimelineService
  ) {}
  noimage: string = 'https://via.placeholder.com/150x150.png?text=No+Image';
  userData: Users = {
    _id: '',
    name: '',
    number: '',
    city: '',
    country: '',
    email: '',
    birthdate: '',
    isBlocked: false,
    jobTitles: [],
    skills: [],
    languages: [],
    tokens: [],
    __v: 0,
  };

  posts: Posts[] = [];
  isLoading: boolean = false;
  image: string = 'https://material.angular.io/assets/img/examples/shiba1.jpg';
  showcomments: boolean = false;
  classApplied = false;
  start: number = -1;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userID = params['id'];
      this.currentuserID.next(this.userID);
      this.loadUserData();
      this.posts = [];
      this.posts.forEach((post) => {
        post.showcomment = false;
      });
    });
  }

  loadUserData() {
    this.currentuserID.subscribe((userID) => {
      if (userID) {
        this.company.getUser(userID).subscribe(
          (results: any) => {
            this.userData = results;
            console.log(this.userData);
          },
          (error: any) => {
            console.log('Error occurred while searching for companies:', error);
          }
        );
      }
    });
  }
}
