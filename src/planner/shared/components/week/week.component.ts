import { AngularFireDatabaseModule } from '@Angular/fire/database';
import { Observable, Subscription } from 'rxjs';
import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, Renderer2, AfterContentChecked, OnDestroy } from '@angular/core';

import { WeekService, Day } from '../../services/week.service';
import { getWeek, isThisSecond } from 'date-fns';
import { getISOWeek, getISODay, getDay, subDays } from 'date-fns'
import { startOfWeek, startOfYear, format } from 'date-fns'
import { addDays } from 'date-fns'
import { Holidays, HolidaysService } from '../../services/holidays.service';
import { ToasterService } from '../../../../toaster/containers/toaster/toaster.service';
import { Store } from '../../../../store';

import { AuthService, User } from '../../../../auth/shared/services/auth/auth.service';

import { AngularFireDatabase } from '@Angular/fire/database';
import { throwIfEmpty } from 'rxjs/operators';

export interface keyValues {
  uid: string;
  date: string;
  part: string;
}

export interface WeekDays {
  year: number;
  day: string;
  month?: string;
  week?: number;
  name: string;
  date: string;
  id: string;
}



// export interface DayParts{
//   id: string;
//   part: string;
// }

export interface Users {
  id: number;
  name: string;
  ill: boolean;
  birthday: string;
  department: string;
}


@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})

export class WeekComponent implements OnInit, AfterViewInit, OnDestroy {



  @Input('weekIndex') weekIndex: number;
  @Input('todayId') todayId: string;
  @Input('userId') userId: number;
  @Input('firstDayOfWeek') firstDayOfWeek: Date;
  @Input('code') code: string;
  @Input('color') color: string;



  currentCell: any;
  startOfYear: Date;

  db: any;


  weekDays: WeekDays[] = [];

  users: Users[] = [];
  // weekNumber: number;
  dayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat', 'Sun'];
  // x: number[] = [];
  dayParts: number[] = [];
  numberOfDayParts: number;

  idCurrent: any;
  // idX: any;
  query: string;

  month: string;
  week: number;
  holidays: Holidays[] = [];
  year: number;

  userDateTimeFormat: string = 'dd-MM-yyyy HH:mm';
  userDateFormat: string = 'dd-MM-yyyy';

  weekData$: Observable<any>;
  subscription: Subscription;
  subscriptionUser: Subscription;

  user$: Observable<User>;

  users$: Observable<any[]>;

  uid: string;



  constructor(
    private _weekService: WeekService,
    private elementRef: ElementRef, private renderer: Renderer2,
    private holidaysService: HolidaysService,
    private _toasterService: ToasterService,
    private store: Store,
    private authService: AuthService,
    private af: AngularFireDatabase
  ) {

  }

  ngOnInit() {

    this.subscription = this.authService.auth$.subscribe();   // kick of or start
    this.user$ = this.store.select<User>('user');
    this.subscriptionUser = this.store.select<User>('user').subscribe(data => {
      this.uid = data.uid
    });

    this.user$.subscribe(data => {
      this.uid = data.uid
    })

    // this.weekData$ = this.af.list(`fdh`);

    console.log('ngOnInit weekcomponent....................................................................')
    // this.users.push(
    //   { id: 1, name: 'Frank1', ill: false, birthday: '20210307', department: 'test' }
    // );

    // this.users.push(
    //   { id: 2, name: 'Frank2', ill: false, birthday: '20210307', department: 'test' }
    // );

    // this.users.push(
    //   { id: 3, name: 'Frank3', ill: false, birthday: '20210307', department: 'test' }
    // );


    this.users$ = this._weekService.getUsers('IT');

    // this.weekNumber = this.week;

    this.year = this.firstDayOfWeek.getFullYear();
    this.week = getISOWeek(this.firstDayOfWeek);
    this.month = format(this.firstDayOfWeek, 'MMM');
    // if (format(addDays(this.startOfYear, this.weekNumber * 7 + 6), 'MMM') !== this.month) {
    //   this.month = this.month + ' - ' + format(addDays(this.startOfYear, this.weekNumber * 7 + 6), 'MMM')
    // }
    this.numberOfDayParts = 2;

    for (let i = 0; i < this.numberOfDayParts; i++) {
      this.dayParts[i] = i;


    }


    this.query = ` between ${format(this.firstDayOfWeek, 'yyyyMMdd')} and ${format(addDays(this.firstDayOfWeek, 6), 'yyyyMMdd')}`;
    console.log(this.query);




    //
    // weekdays
    //
    for (var i = 0; i < 7; i++) {
      // this.weekDays.push({
      //   day: format(addDays(this.startOfYear, this.weekNumber * 7 + i), 'dd'),
      //   year: 2021,
      //   name: this.dayNames[i],
      //   date: format(addDays(this.startOfYear, this.weekNumber * 7 + i), 'yyyyMMdd'),
      //   id: format(addDays(this.startOfYear, this.weekNumber * 7 + i), 'yyyyMMdd'),

      // });

      this.weekDays.push({
        day: format(addDays(this.firstDayOfWeek, i), 'dd'),
        year: 2021,
        name: this.dayNames[i],
        date: format(addDays(this.firstDayOfWeek, i), 'yyyyMMdd'),
        id: format(addDays(this.firstDayOfWeek, i), 'yyyyMMdd'),

      });

    }

  

  }

  // get uid(){
  //   return this.authService.user;
  // }






  //
  //
  //
  onSearchInDb(key: string) {
    for (var i = 0; i < this.db.length; i++) {
      if (this.db[i].key === key) {
        return true
      }
    }
    return false;
  }

  onInsertUpdateFromDb(parKey: string): void {
    for (var i = 0; i < this.db.length; i++) {
      var key = `${this.db[i].userId}_${this.db[i].dateId}_${this.db[i].part}`;
      if (key === parKey) {
        console.log('update')
        // this.db.splice(i, 1); 
        // { this.db[i] } = { key: parKey, code: this.code ? this.code : '', color: this.color ? this.color : 'white' }
        this.db[i].code = this.code;
        this.db[i].color = this.color
        return
      }
    }
    console.log('insert')
    this.db.push({ key: parKey, code: this.code ? this.code : '', color: this.color ? this.color : 'white' });
    return;
  }


  onTest() {
    console.log('mouseover');
  }

  onKeyGet(key, index) {
    return key.split('_')[index];
  }

  //
  //
  //
  onKeyValues(key): keyValues {
    const values = key.split('_');
    return {
      uid: values[0],
      date: values[1],
      part: values[2]
    }
  }

  //
  // Click on Cell
  //
  onCellClick(id) {
    if (!this.code && !this.color) {
      this._toasterService.warning('Choose code or color');
      return
    }
    if (!this.authService.authState) {
      this._toasterService.error('Not logged in ');
      return
    }

    const keyValue = this.onKeyValues(id);
    console.log('KeyValues', id, keyValue);


    // const currentColor = document.getElementById(key).style.backgroundColor  ;
    // const currentCode = document.getElementById(key).textContent;
    // if (!currentCode && !currentColor){
    //   console.log('Insert');
    // } else{
    //   console.log('Update');
    // }

    var key = `${id}`;


    //     element.getAttribute('key'); // Getter
    // element.setAttribute('key', 'value'); // Setter


    const dataKey = document.getElementById(key).getAttribute('data-key');
    console.log('data-key', dataKey)

    if (dataKey) {
      console.log('Update key ', dataKey);
      this._weekService.update(dataKey, {
        code: this.code
      })

    } else {
      console.log('Insert');
      // this.day = {year:this.year}
      // const newDay = new Day();
      this._weekService.insert({
        week: this.week,
        date: keyValue.date,
        part: keyValue.part,
        uid: keyValue.uid,
        code: this.code,
        color: this.color,
        year: this.year
      })

    }
    return
    if (this.code) {
      // this.day.code = this.code;

    }

    if (this.color) {
      // this.day.color = this.color
    }


    console.log('onCellClick', key, this.onKeyGet(key, 1));
    return
    if (this.code) {
      console.log('update code', this.code);
      document.getElementById(key).textContent = this.code;
      // this._weekService.insert(this.onKeyGet(key, 1), this.uid, {
      //   code: this.code,
      //   year: this.year,
      //   week: this.week,
      // });

    }

    if (this.color) {
      console.log('update color', this.color);
      document.getElementById(key).style.backgroundColor = this.color;
    }



    //  this.onInsertUpdateFromDb(id);

    // this.db.push({ key: id, code: this.code ? this.code : '', color: this.color ? this.color : 'white' });

    // console.log('onCellClick', id);
    // if (this.onSearchInDb(id)) {
    //   this.db(id).code = this.code;
    // } else {
    //   this.db.push({ key: id, code: this.code ? this.code : '', color: this.color ? this.color : 'white' });

    // }
    // console.log('ddb', this.db)
    // this.onDatabase2Planner();


  }

  //
  //
  //
  onUpdate() {


  }

  @HostListener('document:click', ['$event'])
  onclick(event) {
    // if(event.target.matches('.editor-div')) {
    //     alert('click to editor div')
    // }

  }

  // @HostListener('document:mouseover', ['$event'])
  // mouseover(event) {
  //   // console.log(event);

  //   // clicked(event) {
  //   //   event.target.classList.add('class3'); // To ADD
  //   //   event.target.classList.remove('class1'); // To Remove
  //   //   event.target.classList.contains('class2'); // To check
  //   //   event.target.classList.toggle('class4'); // To toggle
  //   // }

  //   // if (event.target.matches('.dayPart')) {
  //   //   // alert('hover to editor div');
  //   //   console.log(event.target,event.target.class);
  //   // }
  //   console.log('@HostListener mouseover',event.target.id);
  //   if (event.target.id) {

  //     if (this.idCurrent) {
  //       this.idCurrent.target.classList.remove('idCurrent');
  //     }

  //     event.target.classList.add('idCurrent');


  //     // this.idX = event.target.id.slice(0, -1) + '1';
  //     // var x = document.querySelector(this.idX);
  //     // x.target.classList.add('idCurrent');

  //     this.idCurrent = event.target.id ? event : null;

  //     // this.currentCell = document.querySelector(this.idCurrent);
  //     // this.currentCell = document.getElementById(this.idCurrent);
  //     // this.currentCell.
  //     // console.log(this.currentCell);
  //     // myElement.style.backgroundColor = "#D93600";

  //   }
  // }

  //
  //
  //
  onMouseEnter(div: any) {
    // console.log("mouseEnter : ", div.target.id);
    var key = div.target.id

    // if (document.getElementById(key).textContent !== '_') {
    //   console.log('empty');
    // }

    // this.idCurrent = div.target.id ? div.target.id : null ;
  }

  onMouseOut(e) {
    //console.log("onMouseOut : ", e);
    e.target.classList.remove('selected');

  }

  onMouseOver(e) {
    //console.log("onMouseOver : ", e);
    e.target.classList.add('selected');
  }

  //
  //
  //
  mouseLeave(id: string) {
    console.log('mouse leave : ' + id);

  }

  //
  //
  //
  // onDatabase2Planner1() {
  //   console.log('db', this.db);
  //   for (var i = 0; i < this.db.length; i++) {
  //     var key = `${this.db[i].userId}_${this.db[i].dateId}_${this.db[i].part}`;
  //     console.log('key', key);
  //     // var key = `${this.db[i].key}`;
  //     // if (document.getElementById(this.db[i].key)) {
  //     if (document.getElementById(key)) {
  //       document.getElementById(key).textContent = this.db[i].code ? this.db[i].code : '.';
  //       document.getElementById(key).style.backgroundColor = this.db[i].color;
  //     }
  //   }
  // }


  // onHolidays2Planner() {
  //   this.holidaysService.getHolidayForWeek(this.weekNumber, this.year, (data: Holidays[]) => {
  //     data.map(x => {
  //       if (document.getElementById('0_' + x.id)) {
  //         document.getElementById('0_' + x.id).textContent = x.name;
  //       }
  //     });

  //     console.log('holidays', data);

  //   });

  // for (var i = 0; i < this._ho; i++) {
  //   if (document.getElementById(this.db[i].key)) {
  //     document.getElementById(this.db[i].key).textContent = this.db[i].item;
  //     document.getElementById(this.db[i].key).style.backgroundColor = this.db[i].color;;
  //   }
  // }
  // }


  //
  //Holidays
  // 
  onHolidays2Planner1() {
    // console.log(this.year,this.week);
    this.holidays = this.holidaysService.getHolidays(this.year, this.week);
    // console.log('onHolidays2Planner1', this.holidays);

    this.holidays.map(x => {
      if (document.getElementById('0_' + x.id)) {
        document.getElementById('0_' + x.id).textContent = x.name;
      }
    })


  }

  //
  //
  //
  // ngAfterContentChecked() {
  //  // this.onHolidays2Planner1();
  //   console.log('*****************************************************************************************************');
  // }


  //
  //
  //

  // changes.map(c =>
  //   ({ key: c.payload.doc.id, ...c.payload.doc.data() })
  // )

  ngAfterViewInit() {
    // this.onDatabase2Planner();
    setTimeout(() => {
      this.onHolidays2Planner1();
    }, 1000)

    console.log('week hol', this.holidaysService.hol);
    
    setTimeout(() => {
      this._weekService.getWeekPlanning(this.week).subscribe(data => {
        // console.log('getWeekPlanning', data);
        data.map(record => {

          const data = record.payload.doc.data();
          const key = `${data.uid}_${data.date}_${data.part}`;
          const keyDb = record.payload.doc.id;
          // console.log('set',keyDb, data);
          // document.getElementById(key).textContent = '.';
          if (document.getElementById(key)) {
            // console.log('aktie---------------.')
            document.getElementById(key).textContent = data.code ? data.code : '.';
            document.getElementById(key).style.backgroundColor = data.color;
            document.getElementById(key).setAttribute('data-key', keyDb)
          } else {
            console.log('key not found', key)
          }

        });


      })
    }, 1000);
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionUser.unsubscribe();
  }


}
