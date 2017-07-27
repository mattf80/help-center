import { User } from './../../../auth/shared/services/auth/auth.service';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent{

  @Input()
  user: User;

  @Output()
  logout = new EventEmitter<any>();

  constructor() { 
  }

  logoutUser() {
    this.logout.emit();
  }

}
