import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// { path: '**', component: PlannerComponent, },
const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
