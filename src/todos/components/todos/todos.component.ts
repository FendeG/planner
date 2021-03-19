import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';

import { TodosService } from '../../services/todos.service';
import { Observable } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todo: string;
  todosRef$: Observable<any>;
  key: string = null;

  constructor(
    private todosService: TodosService,
    private db: AngularFirestore,

  ) { }

  ngOnInit(): void {
    // this.todosRef$ = this.db.collection('todos').valueChanges();
    this.todosRef$ = this.db.collection('todos').snapshotChanges();

  }

 

  onAdd() {
    if (this.key) {

      this.todosService.onTodoUpdate(this.key, { todo: this.todo });
      this.onReset();
    } else {
      console.log('add', this.todo);
      this.todosService.onTodoAdd({ todo: this.todo });
      this.onReset();
    }
  }

  onReset(){
    this.todo = null;
    this.key = null
  }

  onEdit(key, item) {
    console.log('edit', key, item);
    this.key = key;
    this.todo = item.todo;

  }

  onDelete(item) {
    this.todosService.onTodoDelete(item);

  }
}
