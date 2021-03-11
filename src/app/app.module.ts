import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderService } from './services/loader.service';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


import { AuthModule } from '../auth/auth.module';
import { PlannerModule } from '../planner/planner.module';
import { ToasterModule } from '../toaster/toaster.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule,
    PlannerModule,
    ToasterModule
  ],
  exports: [
  ],
  providers: [
    LoaderService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
