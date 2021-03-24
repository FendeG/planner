import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TodosModule} from '../todos/todos.module';


// { path: '**', component: PlannerComponent, },
const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'planner'}, // default route
  {path:'todos',loadChildren:'../todos/todos.module#TodosModule'},
  {path:'test',loadChildren:'../test-firestore/test-firestore.module#TestFirestoreModule'},
  {path:'users',loadChildren:'../users/users.module#UsersModule'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
