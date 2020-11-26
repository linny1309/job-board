import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './components/menu/menu.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { JobsListComponent } from './components/jobs-list/jobs-list.component';
import { LoginComponent } from './components/login/login.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { EditComponent } from './pages/edit/edit.component';
import { LoaderComponent } from './components/loader/loader.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { SelectComponent } from './select/select.component';
import { ChartjsFormComponent } from './chartjs-form/chartjs-form.component';
import { DemoComponent } from './demo/demo.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    MenuComponent,
    RegistrationComponent,
    JobsListComponent,
    LoginComponent,
    DocumentsComponent,
    EditComponent,
    LoaderComponent,
    JobsComponent,
    PostListComponent,
    SelectComponent,
    ChartjsFormComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
