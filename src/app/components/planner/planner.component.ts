import { SwitchView } from '@angular/common/src/directives/ng_switch';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { getISOWeek, format, startOfYear, addDays, isThisWeek, startOfWeek } from 'date-fns'


import { PlannerService } from 'src/app/services/planner.service';

// const x = of(1, 2, 3, 4);

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss']
})
export class PlannerComponent implements OnInit, OnDestroy {

  nrOfWeeks: number;
  form: FormGroup;
  userId: number;
  todayId: string;
  todayDate: string;
  firstMondays: Date[] = [];
  weekCounter: number;

  constructor(
    private _formBuilder: FormBuilder,
    private _plannerService: PlannerService

  ) {

  }

  ngOnInit() {
    this.userId = 1;
    this.todayId = format(new Date(), 'yyyyMMdd');
    this.todayDate =  format(new Date(), 'dd--MM-yyyy');


    this.nrOfWeeks = 4;

    this.form = this._formBuilder.group({
      aantal: [{ value: '4', disabled: false }, Validators.required],
      code: [{ value: '', disabled: false }],
      color: [{ value: '', disabled: false }]
    });

    this.onWeek(0);
    // console.log('startOfWeek', startOfWeek(new Date(), { weekStartsOn: 1 }));
  }



  onWeek(nr: number) {
    if (nr === 0) {
      this.weekCounter = 0
    } else {
      this.weekCounter = this.weekCounter + nr;
    }

    this.firstMondays = [];
    for (var i = 0; i < this.nrOfWeeks; i++) {
      console.log(startOfWeek(new Date(), { weekStartsOn: 1 }), addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), (this.weekCounter + i) * 7));
      this.firstMondays.push(
        addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), (this.weekCounter + i) * 7)
      )
    }
  }




  onWeeksChange(e) {
    // console.log('onWeeksChange', e);
    this.nrOfWeeks = e;
    this.onWeek(this.weekCounter);
  }

  ngOnDestroy() {
  }
}
