import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { startOfWeek, startOfYear, format } from 'date-fns'

import { AngularFirestore } from '@angular/fire/firestore';
// import { AngularFireDatabase ,AngularFireList} from '@Angular/fire/database';
import { tap } from 'rxjs/operators';

import { Store } from '../../../store';

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
    private store: Store
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


  getWeekPlanning(weekNr: number): Observable<Users[]> {
    return this._http.get<Users[]>(api_users)
  }

  save(item) {
    console.log('save', item);
    this.db.collection("planner").add(item);
  }


  //
  //     userId : date : dagdeel : code : color
  //
  //
  //
  //
  //
}
