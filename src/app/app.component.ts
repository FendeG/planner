import { Component } from '@angular/core';

import { Store } from '../store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'planner';

  todos$ = this.store.select<any[]>('todos');

  constructor(
    private store: Store
  ) {
    this.store.set('todos',[{id:1,name:'test'},{id:2,name:'test2'}]);
    console.log(this.store);
  }
}



