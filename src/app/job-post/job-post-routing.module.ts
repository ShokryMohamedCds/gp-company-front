import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobPostComponent } from './job-post.component';
import { CVSComponent } from './cvs/cvs.component';

const routes: Routes = [
  { path: '', component: JobPostComponent },
  { path: ':id', component: CVSComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobPostRoutingModule {}
