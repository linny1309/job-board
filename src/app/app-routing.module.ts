import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentsComponent } from './pages/documents/documents.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { DemoComponent } from './pages/demo/demo.component';
import { EditComponent } from './pages/edit/edit.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { VisualsComponent } from './pages/visuals/visuals.component';
import { LogoComponent } from './components/logo/logo.component'
import { PaginationComponent } from './components/pagination/pagination.component'
import { LoginComponentPage } from './pages/login/login.component';

const routes: Routes = [
  { path: '', component: DemoComponent},
  { path:'pagination', component: PaginationComponent},
  { path: 'logo', component: LogoComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'jobs', component: JobsComponent},
  { path: 'documents', component: DocumentsComponent},
  { path: 'edit/:postId', component: EditComponent},
  { path: 'visuals', component: VisualsComponent},
  { path: 'login', component: LoginComponentPage},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
