import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';

import { Store } from '../../../../store';

//import {do} from 'rxjs/operators';

export interface User {
  email: string,
  uid: string,
  authenticated: boolean
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // auth$ = this.af.authState.pipe(
  //   switchMap(next => {
  //     if(!next){
  //       this.store.set('user',null)
  //     }

  // }));

  constructor(
    private store: Store,
    private af: AngularFireAuth
  ) { }

  createUser(email: string, password: string) {
    return this.af.createUserWithEmailAndPassword(email, password)
  }

  loginUser(email: string, password: string) {
    return this.af.signInWithEmailAndPassword(email, password)
  }
}
