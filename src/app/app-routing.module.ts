import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentsComponent } from './pages/documents/documents.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { EditComponent } from './pages/edit/edit.component';
import { JobsComponent } from './pages/jobs/jobs.component';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent},
  { path: 'jobs', component: JobsComponent},
  { path: 'documents', component: DocumentsComponent},
  { path: 'edit/:postId', component: EditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
