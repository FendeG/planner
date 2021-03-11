import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { getWeek, addDays, format, getISOWeek } from 'date-fns';
// import { format } from 'url';

export interface Holidays {
  name: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {

  holidays: Holidays[] = [];
  date: Date;
  easter: Date;
  today: Date;
  tempDate: Date;
  hol = {};
  // holidaysYear: any;
  // holiday { 
  //  2021: [] , 
  // 2021: []
  //}
  //
  //}
  holidaysYearWeek = new Map<string, Array<Holidays>>();

  constructor() {

    this.today = new Date();
    this.onCreateHolidaysYearWeek(this.today.getFullYear());
    console.log('Holidays', this.hol);
    // this.holidaysYearWeek.set(`${this.today.getFullYear()}-${getWeek(this.today)}`, this.onCreateHolidaysYearWeek(this.today.getFullYear()),getWeek(this.today));

    // console.log('dict', this.holidaysYear);
  }


  //
  // Add
  //
  add(year, holidayDate, name) {
    var week = getISOWeek(holidayDate);
    // var year = String(yearNumber);
    // console.log('add', year, week);

    var key = `${year}-${week}`;
    // console.log('key', key);

    if (this.hol[key]) {
      this.hol[key] = this.hol[key].push(
        {
          name: name,
          id: format(holidayDate, 'yyyyMMdd')
        }
      )
    } else {
      this.hol[key] = [{ name: name, id: format(holidayDate, 'yyyyMMdd') }]
    }
  }

  getHolidays(year, week): Holidays[] {
    var key = `${year}-${week}`;

    return this.hol[key] ? this.hol[key] : [];

  }

  onCreateHolidaysYearWeek(year: number): void {

    this.easter = this.onEaster(year);

    this.holidays = [];

    this.add(year, this.easter, 'Pa');
    this.add(year, addDays(this.easter, 1), 'Pa');
    this.add(year, addDays(this.easter, 39), 'He');
    this.add(year, addDays(this.easter, 40), 'He');
    this.add(year, addDays(this.easter, 49), 'Pi');
    this.add(year, addDays(this.easter, 50), 'Pi');
    this.add(year, new Date(year, 4, 27), 'Ko');


    // this.add(year, new Date(), 'Today');


    // this.holidays.push({
    //   date: this.easter,
    //   name: 'Pa',
    //   id: format(this.easter, 'yyyyMMdd'),
    //   week: getWeek(this.easter)
    // });

    // this.tempDate = this.easter;

    // this.holidaysYearWeek.set(`${year}-${getWeek(this.tempDate)}`, [{
    //   date: addDays(this.easter, 39),
    //   name: 'He',
    //   id: format(addDays(this.easter, 39), 'yyyyMMdd')
    // }]);

    // this.holidays.push({
    //   date: addDays(this.easter, 39),
    //   name: 'He',
    //   id: format(addDays(this.easter, 39), 'yyyyMMdd')
    // });

    // this.holidays.push({
    //   date: new Date(year, 4, 27),
    //   name: 'Ko',
    //   id: format(new Date(year, 4, 27), 'yyyyMMdd')

    // });

    // this.holidays.push({
    //   date: new Date(year, 2, 3),
    //   name: 'Test',
    //   id: format(new Date(year, 2, 3), 'yyyyMMdd'),
    //   week: getWeek(new Date(year, 2, 3))
    // });

    // return this.holidays;
  }



  easter1(Y) {
    var C = Math.floor(Y / 100);
    var N = Y - 19 * Math.floor(Y / 19);
    var K = Math.floor((C - 17) / 25);
    var I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
    I = I - 30 * Math.floor((I / 30));
    I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11));
    var J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4);
    J = J - 7 * Math.floor(J / 7);
    var L = I - J;
    var M = 3 + Math.floor((L + 40) / 44);
    var D = L + 28 - 31 * Math.floor(M / 4);

    return this.padout(M) + '.' + this.padout(D);
  }

  padout(number) { return (number < 10) ? '0' + number : number; }

  // Hemelvaartsdag altijd 39 dagen later, 
  // Pinksteren altijd op de 7e zondag na Pasen, de 49e dag na Pasen of 50e dag van Pasen 

  private onEaster(y) {

    var date, a, b, c, m, d;

    // Instantiate the date object.
    date = new Date;

    // Set the timestamp to midnight.
    date.setHours(0, 0, 0, 0);

    // Set the year.
    date.setFullYear(y);

    // Find the golden number.
    a = y % 19;

    // Choose which version of the algorithm to use based on the given year.
    b = (2200 <= y && y <= 2299) ?
      ((11 * a) + 4) % 30 :
      ((11 * a) + 5) % 30;

    // Determine whether or not to compensate for the previous step.
    c = ((b === 0) || (b === 1 && a > 10)) ?
      (b + 1) :
      b;

    // Use c first to find the month: April or March.
    m = (1 <= c && c <= 19) ? 3 : 2;

    // Then use c to find the full moon after the northward equinox.
    d = (50 - c) % 31;

    // Mark the date of that full moon—the "Paschal" full moon.
    date.setMonth(m, d);

    // Count forward the number of days until the following Sunday (Easter).
    date.setMonth(m, d + (7 - date.getDay()));

    // Gregorian Western Easter Sunday
    return date;

  }


  // async getHolidayForWeek(week: number, year: number, callback) {

  //   console.log('getHolidayForWeek', year, week, this.holidaysYear.get(this.today.getFullYear()));
  //   if (!this.holidaysYear.has(year)) {
  //     console.log('new holdays for year ', year);
  //     await this.holidaysYear.set(year, this.onCreateHolidaysYear(year));
  //     console.log('Done new holdays for year ', year);
  //   }
  //   console.log('returning holidays', year);

  //   callback(this.holidaysYear.get(year).filter(x =>
  //     getWeek(x.date) == week
  //   ))

  // }

}
