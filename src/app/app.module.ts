import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeeksComponent } from './components/weeks/weeks.component';
import { PlannerComponent } from './components/planner/planner.component';
import { WeekComponent } from './components/week/week.component';

import { PlannerService } from './services/planner.service';
import { HolidaysService } from './services/holidays.service';
import { LoaderService } from './services/loader.service';
import { WeekService } from './components/week/week.service';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ToasterComponent } from './components/toaster/toaster.component';
import { ToasterService } from './components/toaster/toaster.service';

import { AuthModule} from '../auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    WeeksComponent,
    PlannerComponent,
    WeekComponent,
    ToasterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule
    // FormsModule
  ],
  exports: [
    // FormsModule,
    // ReactiveFormsModule,
  ],
  providers: [
    PlannerService,
    WeekService,
    LoaderService,
    HolidaysService,
    ToasterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
