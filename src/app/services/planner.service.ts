import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlannerService {

  // private showNumberOfWeeks = new Subject<number[]>();


  constructor() { }

  // getShowNumberOfWeeks(): Observable<number[]> {
  //   return this.showNumberOfWeeks.asObservable();
  // }

  // setShowNumberOfWeeks(numberOfWeeks: number) {
  //   switch (numberOfWeeks) {
  //     case 1:
        
  //       break;
    
  //     default:
  //       break;
  //   }
  //   var temp: Array<number>;
  //   for (var i = 0; i < numberOfWeeks; i++){
  //     // temp.push(i);
  //     // temp.push({ i });
      
  //   }
  //   this.showNumberOfWeeks.next(temp);
  //   // this.showNumberOfWeeks.next(Array(Number(numberOfWeeks)).fill(0).map((x, i) => i));
  // }


}
