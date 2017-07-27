import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './containers/app/app.component';

import { Store } from './../store';

//feature modules
import { AuthModule } from '../auth/auth.module';

//routes
export const ROUTES: Routes = [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    AuthModule
  ],
  providers: [
    Store
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }