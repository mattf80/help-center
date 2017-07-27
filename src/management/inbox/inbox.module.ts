import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { InboxComponent } from './containers/inbox/inbox.component';

export const ROUTES: Routes = [
    {
        path: '', component: InboxComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: [],
    declarations: [InboxComponent]
})
export class InboxModule { }
