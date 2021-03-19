import { Component, OnInit } from '@angular/core';
import {TestFirestoreService} from './test-firestore.service';


@Component({
  selector: 'app-test-firestore',
  templateUrl: './test-firestore.component.html',
  styleUrls: ['./test-firestore.component.css']
})
export class TestFirestoreComponent implements OnInit {

  constructor(
    private testFirestoreService:TestFirestoreService
  ) { }

  ngOnInit(): void {
  }

  add(){
    this.testFirestoreService.add();
  }

  update(){
    this.testFirestoreService.update()
  }


  userCreate(){
    this.testFirestoreService.usersCreate();

  }

}
