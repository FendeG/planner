import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './components/todos/todos.component';
import { RouterModule, Routes } from '@angular/router';



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

  ]
})
export class TodosModule { }
