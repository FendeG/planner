import { ComponentFixture } from '@angular/core/testing';
import { AngularFireDatabase } from '@Angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from 'store';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/shared/services/auth/auth.service';

// import {fire} from ;

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  todosRef: Observable<any>;

  

  constructor(
    private _http: HttpClient,
    private db: AngularFirestore,
    private store: Store,
    private authService:AuthService
  
  ) { 

    this.todosRef = this.db.collection('todos').valueChanges();
  }

 

  get uid(){
    return this.authService.user;
  }
  // firebase.firestore.FieldValue.serverTimestamp()
  onTodoAdd(item) {
    console.log('save', item);
    this.db.collection("todos").add({...item,created:new Date()});
    // this.db.collection('todos').doc('tt').set(item);
  
    
  }

onTodoUpdate(key,item){
  console.log('onTodoUpdate',key,item);
  this.db.collection(`todos`).doc(key).set(item);
}

  onTodoDelete(item){
    this.db.collection("todos").doc(item.payload.doc.id ).delete();
    console.log('delete',item)

  }
}
