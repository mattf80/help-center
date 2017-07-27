import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

//third party modules
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

//shared modules
import { SharedModule } from './shared/shared.module';

export const ROUTES: Routes = [
    {
        path: 'auth',
        children: [
            {
                path: '', pathMatch: 'full', redirectTo: 'login'
            },
            {
                path: 'login', loadChildren: './login/login.module#LoginModule'
            },
            {
                path: 'register', loadChildren: './register/register.module#RegisterModule'
            }
        ]
    }
];

export const firebaseConfig: FirebaseAppConfig = {
    apiKey: "AIzaSyCtDZ_U4Came-kDhEHzJkDHzRbCkrPtU-E",
    authDomain: "help-center-56d1d.firebaseapp.com",
    databaseURL: "https://help-center-56d1d.firebaseio.com",
    projectId: "help-center-56d1d",
    storageBucket: "help-center-56d1d.appspot.com",
    messagingSenderId: "732551193427"
};

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        SharedModule.forRoot()
    ]
})
export class AuthModule { }