import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from 'store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  todosRef: Observable<any>;

  constructor(
    private _http: HttpClient,
    private db: AngularFirestore,
    private store: Store
  ) { 

    this.todosRef = this.db.collection('todos').valueChanges();
  }


  onTodoAdd(item) {
    console.log('save', item);
    this.db.collection("todos").add(item);
  }
  
}
