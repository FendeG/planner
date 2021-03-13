import { Component,ChangeDetectionStrategy,OnInit, Output, EventEmitter, Input } from '@angular/core';
import { User } from 'src/auth/shared/services/auth/auth.service';

@Component({
  selector: 'app-header',
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() user:User;
  @Output() logout = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  logoutUser(){
    console.log('onlogout');
    this.logout.emit();
  }
}
