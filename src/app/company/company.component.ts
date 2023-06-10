import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Posts } from '../models/posts';
import { CompanyService } from '../services/company.service';
import { CompanyData } from 'src/app/models/company-data';
import { BehaviorSubject } from 'rxjs';
import { TimelineService } from '../services/timeline.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  companyId: string | undefined;
  currentCompanyId: BehaviorSubject<string | undefined> = new BehaviorSubject<
    string | undefined
  >(undefined);
  constructor(
    private route: ActivatedRoute,
    private company: CompanyService,
    private timeline: TimelineService
  ) {}
  noimage: string = 'https://via.placeholder.com/150x150.png?text=No+Image';
  companyData: CompanyData = {
    name: '',
    number: '',
    email: '',
    about: '',
    country: '',
    city: '',
    numberOfemployee: 0,
    industry: '',
    address: '',
    isFollowed: false,
    image: this.noimage,
  };

  posts: Posts[] = [];
  isLoading: boolean = false;
  image: string = 'https://material.angular.io/assets/img/examples/shiba1.jpg';
  showcomments: boolean = false;
  classApplied = false;
  start: number = -1;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.companyId = params['id'];
      this.currentCompanyId.next(this.companyId);
      this.loadCompanyData();
      this.posts = [];
      this.getCompanyPosts(this.companyId);
      this.posts.forEach((post) => {
        post.showcomment = false;
      });
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

    if (windowBottom >= docHeight && !this.isLoading && this.posts.length > 0) {
      this.isLoading = true;
      this.start += 1;
      const lastPostIndex = this.posts.length - 1;
      const date = this.posts[lastPostIndex].createdAt;
      console.log(date);

      this.timeline
        .getMoreCompanyPosts(this.start, date, this.companyId)
        .subscribe((res) => {
          if (res.length) {
            this.posts.push(...res);
            console.log(this.posts);
            this.isLoading = false;
          }
        });
    }
  };

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollHandler, true);
  }
  getCompanyPosts(id: any) {
    this.start += 1;
    this.timeline.getCompanyPosts(this.start, id).subscribe((res) => {
      this.posts.push(...res);
      console.log(this.posts);
    });
  }

  follow() {
    this.company.follow(this.companyId!).subscribe((res) => {
      this.companyData.isFollowed = res.isFollowed;
    });
  }

  loadCompanyData() {
    this.currentCompanyId.subscribe((companyId) => {
      if (companyId) {
        this.company.getCompany(companyId).subscribe(
          (results: any) => {
            this.companyData = results.data;
            console.log(this.companyData);
          },
          (error: any) => {
            console.log('Error occurred while searching for companies:', error);
          }
        );
      }
    });
  }
}
