import { Router } from '@angular/router';

import { AuthService, User } from './../../../auth/shared/services/auth/auth.service';
import { Store } from './../../../store';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from "rxjs/Subscription";
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  
  user$: Observable<User>;
  subscription: Subscription;

  constructor (
    private store: Store, 
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.authService.auth$.subscribe();
    this.user$ = this.store.select<User>('user');
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();    
  }

  async onLogout() {
    await this.authService.logoutUser();
    this.router.navigate(['/auth/login']);

  }
}