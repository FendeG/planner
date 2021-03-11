import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert, AlertType } from './toast.interface';

import { ToasterService } from './toaster.service';


@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent implements OnInit {

  
  messages: Alert[] = [];

  subscription: Subscription;

  constructor(private _toastService: ToasterService) {

    this.subscription = this._toastService.getMessage().subscribe(message => {
      if (message) {
        this.messages.push(message);
        if (message.timeOut && message.timeOut > 0) {
          setTimeout(() => this.removeAlert(message), message.timeOut);
        }
      } else {
        this.messages = []; // clear messages when empty message received
      }
    });


  }

  ngOnInit() {
  }

  //
  // Remove Toast
  //
  removeAlert(alert: any) {
    // console.log('remove Alert : ' + JSON.stringify(alert))
    this.messages = this.messages.filter(x => x !== alert);
  }


  iconType(alertType: AlertType) {
    switch (alertType) {
      case AlertType.Error:
        return '🚨';
        break;
      case AlertType.Info:
        return 'ℹ️'
      case AlertType.Warning:
        return '⚠️'
      case AlertType.Success:
        return ''
      default:
        return '';

        break;
    }
  }
  //
  // Wich Class
  //
  cssClass(alert: any) {
    if (!alert) return;

    const classes = ['messages', 'alert-error'];

    const alertTypeClass = {
      [AlertType.Success]: 'alert-success',
      [AlertType.Error]: 'alert-danger',
      [AlertType.Info]: 'alert-info',
      [AlertType.Warning]: 'alert-warning'
    }

    classes.push(alertTypeClass[alert.type]);

    // if (alert.fade) {
    //     classes.push('fade');
    // }

    return classes.join(' ');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();       // unsubscribe to ensure no memory leaks
  }


}
