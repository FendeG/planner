import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { startOfWeek, startOfYear, format } from 'date-fns'

import { AngularFirestore ,CollectionReference} from '@angular/fire/firestore';
// import { AngularFireDatabase ,AngularFireList} from '@Angular/fire/database';
import { map, tap } from 'rxjs/operators';

import { Store } from '../../../store';
import { AuthService } from '../../../auth/shared/services/auth/auth.service';
import { registerLocaleData } from '@angular/common';

export interface Users {
  userId: number;
  name: string;

}

export interface Planning {
  userId: number;
  day: number;
  part: number;
  planning: string;
  color: string;
}


export interface Day {
  uid: string;
  year:number;
  part: string;
  code: string;
  color: string;
  week:number;
  date:string;

}

const api_users = "assets/users.json";

@Injectable({
  providedIn: 'root'
})
export class WeekService {

  dateToday_yyyyMMdd: string;
  dateToday: Date;


  //
  // 
  //
  // plannerData : Observable<any> = this.db.list(`fdh`).do(
  //   next => this.store.set('fdh',next)
  // );

  plannerData$: Observable<any>;

  // ().do(
  //   next => this.store.set('fdh',next)
  // )

  tutorialsRef: Observable<any>;

  constructor(
    private _http: HttpClient,
    private db: AngularFirestore,
    private store: Store,
    private authService: AuthService,
    // private collectionReference:CollectionReference
  ) {
    this.dateToday = new Date()
    this.dateToday_yyyyMMdd = format(new Date(), 'yyyy-MM-dd');
    console.log('Constructor WeekService');

    //
    // 
    //
    // this.plannerData$ = this.db.list('fdh');
    this.tutorialsRef = this.db.collection('planner').valueChanges();


    // .pipe(
    //   tap(
    //     next => this.store.set('fdh', next)
    //   ));


  }

  get uid() {
    
    return this.store.select('user').pipe(map(data => {
      console.log(data)
    }));

  }

  getUsers(department:string):Observable<any[]>{
    return this.db.collection('users', ref => ref.where("department", "==", department)).snapshotChanges();

  }

  getWeekPlanning(week:number):Observable<any[]>{
   
    return this.db.collection('planner', ref => ref.where("week", "==", week)).snapshotChanges();
    // this.collectionReference.where("week", "==", 13)

    // return this._http.get<Users[]>(api_users)
  }


  insert(day:Day) {
    // this.store.
    console.log('save day', day);
    this.db.collection('planner').add(day);
    // this.db.collection(`planner/${date}/${uid}`).add(item);
   // this.db.collection(`planner`).add({...item,uid:uid,date:date,created:new Date()});
  }

  update(key,item){
    this.db.collection('planner').doc(key).set(item,{merge:true})

  }

  //
  //     userId : date : dagdeel : code : color
  //
  //
  //
  //
  //
}
