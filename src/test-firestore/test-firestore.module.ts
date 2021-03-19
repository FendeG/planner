import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestFirestoreComponent } from './test-firestore.component';
import { RouterModule, Routes } from '@angular/router';

import {TestFirestoreService} from './test-firestore.service';

export const ROUTES: Routes = [
  {
    path: '',
    component: TestFirestoreComponent
  }

]

@NgModule({
  declarations: [TestFirestoreComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),

  ],
  providers:[
    TestFirestoreService,

  ]
})
export class TestFirestoreModule { }
