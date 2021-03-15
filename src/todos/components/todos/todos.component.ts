import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';

import {TodosService} from '../../services/todos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todo:string;
  todosRef$: Observable<any>;

  constructor(
    private todosService:TodosService,
    private db: AngularFirestore,

  ) { }

  ngOnInit(): void {
    this.todosRef$ = this.db.collection('todos').valueChanges();

  }

  onAdd(){
    console.log('add',this.todo);
    this.todosService.onTodoAdd({todo:this.todo})
  }
}
