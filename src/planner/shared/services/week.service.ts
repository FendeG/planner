import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { startOfWeek, startOfYear, format } from 'date-fns'


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

  constructor(
    private _http: HttpClient
  ) {
    this.dateToday = new Date()
    this.dateToday_yyyyMMdd = format(new Date(), 'yyyy-MM-dd');
    console.log('Constructor WeekService');
  }

  getWeekPlanning(weekNr: number): Observable<Users[]> {
    return this._http.get<Users[]>(api_users)
  }

  

  //
  //     userId : date : dagdeel : code : color
  //
  //
  //
  //
  //
}
