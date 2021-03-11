import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alert, AlertType } from './toast.interface';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  private subject = new Subject<Alert>();


  getMessage(): Observable<Alert> {
    return this.subject.asObservable();
  }

  sendMessage(message: Alert) {
    this.subject.next(message);
  }

  clearMessages() {
    this.subject.next();
  }


  error(message: string, options?: any) {
    this.sendMessage(new Alert({ ...options, type: AlertType.Error, message }));
  }

  success(message: string, options?: any) {
    this.sendMessage(new Alert({ ...options, type: AlertType.Success, message }));
  }

  warning(message: string, options?: any) {
    this.sendMessage(new Alert({ ...options, type: AlertType.Warning, message }));
  }

  info(message: string, options?: any) {
    this.sendMessage(new Alert({ ...options, type: AlertType.Info, message }));
  }

}
