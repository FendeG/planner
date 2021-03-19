import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, tap } from 'rxjs/operators';

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

  auth$ = this.af.authState.pipe(
    tap(next => {
      if (!next) {
        this.store.set('user', null);
        return
      }
      const user: User = {
        email: next.email,
        uid: next.uid,
        authenticated: true
      }
      this.store.set('user', user);
    })
  );

  constructor(
    private store: Store,
    private af: AngularFireAuth
  ) { }

  get user(){
    return this.af.currentUser;
  
  }

  get authState() {
    return this.af.authState;
  }

  createUser(email: string, password: string) {
    return this.af.createUserWithEmailAndPassword(email, password)
  }

  loginUser(email: string, password: string) {
    return this.af.signInWithEmailAndPassword(email, password)
  }
  logoutUser() {
    return this.af.signOut();

  }
}
