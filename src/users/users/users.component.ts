import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import {}  from 'firebase-admin';

// const functions = require("firebase-functions");


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users$:Observable<any>;

  constructor(
    private usersService:UsersService
  ) { }


  ngOnInit(): void {
    this.users$ = this.usersService.getUsers();
  }

}
