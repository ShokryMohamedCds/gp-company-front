import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoboffersComponent } from './joboffers.component';

const routes: Routes = [
  { path: '', component: JoboffersComponent },
  {
    path: 'joboffers',
    component: JoboffersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoboffersRoutingModule {}
