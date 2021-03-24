import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  // users$: Observable<any>;

  constructor(
    private db: AngularFirestore,
    // private af: AngularFireAuth,


  ) { 

  }

  //
  //
  //
  getUsers(){
    return this.db.collection('users').valueChanges();
  }

}
