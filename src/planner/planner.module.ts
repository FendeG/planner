import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'

import { ReactiveFormsModule } from '@angular/forms';

import {WeekComponent} from './shared/components/week/week.component';
import {PlannerComponent} from './containers/planner/planner.component';

import {HolidaysService} from './shared/services/holidays.service';
import {WeekService} from './shared/services/week.service';

export const ROUTES: Routes = [
  { path: '' ,component:PlannerComponent}
]

@NgModule({
  declarations: [
    WeekComponent,
    PlannerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],providers:[
    HolidaysService,
    WeekService
  ]
})
export class PlannerModule { }