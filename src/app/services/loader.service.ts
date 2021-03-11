import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private  readonly  _loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor() { }


  // returns value of `_loading` on the moment of accessing `isLoading`
  get isLoading(): boolean {
    return this._loading.getValue();
  }
  
  // returns value of `_loading` as Observable
  get isLoading$(): Observable<boolean> {
    return this._loading.asObservable();
  }
  
  // pushes `true` as a new value of `_loading` subject and notifies subscribers
  start(): void {
    this._loading.next(true);
  }
  
  // pushes `true` as a new value of `_loading` subject and notifies subscribers
  stop(): void {
    this._loading.next(false);
  }
}
