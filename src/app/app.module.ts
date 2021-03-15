import { Store } from '../store';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderService } from './services/loader.service';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


import { AuthModule } from '../auth/auth.module';
import { ToasterModule } from '../toaster/toaster.module';
import { PlannerModule } from '../planner/planner.module';
import { HeaderComponent } from './components/header/header.component';

import {TodosModule} from '../todos/todos.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule,
    ToasterModule,
    PlannerModule,
    TodosModule
  ],
  exports: [
  ],
  providers: [
    LoaderService,
    Store
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
