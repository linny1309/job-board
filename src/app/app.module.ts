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
import { SelectComponent } from './components/select/select.component';
import { ChartjsFormComponent } from './components/chartjs-form/chartjs-form.component';
import { DemoComponent } from './pages/demo/demo.component';
import { ChartsModule } from 'ng2-charts';
import { VisualsComponent } from './pages/visuals/visuals.component';
import { KpiCardComponent } from './components/kpi-card/kpi-card.component';
import { LogoComponent } from './components/logo/logo.component';
import { AdvancedViewComponent } from './components/advanced-view/advanced-view.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

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
    DemoComponent,
    VisualsComponent,
    KpiCardComponent,
    LogoComponent,
    AdvancedViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
