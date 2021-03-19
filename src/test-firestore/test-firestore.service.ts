import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from 'store';
import { AuthService } from 'src/auth/shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TestFirestoreService {

  constructor(
    private _http: HttpClient,
    private db: AngularFirestore,
    private store: Store,
    private authService: AuthService
  ) { }


  // .add(...) and .doc().set(data) are completely equivalent

  //
  //
  //
  add() {
    this.db.collection('Cities').add(
      {
        name: "Tokyo",
        country: "Japan"
      }
    )
  }

  //
  //
  //

  update(){
    this.db.collection('Cities').doc("DC").update({
      captital:true
    })
  }

  usersCreate(){
    const collection = 'users'
    this.db.collection(collection).add(
      {
        name: "Frank",
        department: "IT"
      }
    );

    this.db.collection(collection).add(
      {
        name: "Frank1",
        department: "IT"
      }
    );
  
    this.db.collection(collection).add(
      {
        name: "Frank2",
        department: "IT"
      }
    );
  }

}
