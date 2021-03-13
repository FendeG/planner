import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '../store';
import { AuthService, User } from '../auth/shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'planner';

  user$: Observable<User>;
  subscription: Subscription;

  todos$ = this.store.select<any[]>('todos');

  constructor(
    private store: Store,
    private router:Router,
    private authService: AuthService
  ) {
    this.store.set('todos', [{ id: 1, name: 'test' }, { id: 2, name: 'test2' }]);
    console.log(this.store);
  }

  ngOnInit() {
    this.subscription = this.authService.auth$.subscribe();   // kick of or start
    this.user$ = this.store.select<User>('user');


  }

  async onLogout(){
    console.log('logout');
    await this.authService.logoutUser();
    this.router.navigate(['/auth/login']);
  }

  
  ngOnDestroy() {
    this.subscription.unsubscribe();

  }
}



