import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './containers/app/app.component';

import { Store } from './../store'; // this works fine
//import {Store} from 'store';

//feature modules
import { AuthModule } from '../auth/auth.module';
import { ManagementModule } from './../management/management.module';

import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppNavComponent } from './components/app-nav/app-nav.component';

//routes
export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inbox' }
];

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppNavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    AuthModule,
    ManagementModule
  ],
  providers: [
    Store
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }