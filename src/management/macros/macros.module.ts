import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { MacrosComponent } from './containers/macros/macros.component';

export const ROUTES: Routes = [
    {
        path: '', component: MacrosComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: [],
    declarations: [MacrosComponent]
})
export class MacrosModule { }
