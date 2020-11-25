import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { RegistrationComponent } from './registration/registration.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { LoginComponent } from './login/login.component';
import { DocumentsComponent } from './documents/documents.component';
import { EditComponent } from './edit/edit.component';
import { JobsComponent } from './jobs/jobs.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    MenuComponent,
    RegistrationComponent,
    JobsListComponent,
    LoginComponent,
    DocumentsComponent,
    EditComponent,
    JobsComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
