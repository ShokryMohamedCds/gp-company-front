import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { AllcommentsComponent } from './allcomments/allcomments.component';
import { PostComponent } from './post/post.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { CommentsComponent } from './comments/comments.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    CompanyComponent,
    PostComponent,
    AllcommentsComponent,
    CommentFormComponent,
    CommentsComponent,
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    InfiniteScrollModule,
    MatIconModule,
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
  ],
})
export class CompanyModule {}
