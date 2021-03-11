import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlannerComponent } from './components/planner/planner.component';

// { path: '**', component: PlannerComponent, },
const routes: Routes = [
  { path: '', component: PlannerComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
