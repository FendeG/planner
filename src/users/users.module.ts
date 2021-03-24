import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { RouterModule, Routes } from '@angular/router';
import { UsersService} from './users.service';

export const ROUTES: Routes = [
  { path: '',component:UsersComponent }
];

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),

  ],providers:[
    UsersService
  ]
})
export class UsersModule { }
