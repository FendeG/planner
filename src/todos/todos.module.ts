import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './components/todos/todos.component';
import { RouterModule, Routes } from '@angular/router';

import {TodosService} from './services/todos.service';

export const ROUTES: Routes = [
  {
    path: '',
    component: TodosComponent
  }

]

@NgModule({
  declarations: [
    TodosComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule

  ],
  providers:[
    TodosService
  ]
})
export class TodosModule { }
