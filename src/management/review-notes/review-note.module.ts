import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ReviewNotesComponent } from './containers/review-notes/review-notes.component';
import { ReviewNoteComponent } from './components/review-note/review-note.component';

import { ReviewNoteFormComponent } from './components/review-note-form/review-note-form.component';

export const ROUTES: Routes = [];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        SharedModule
    ],
    exports: [],
    declarations: [
        ReviewNoteComponent,
        ReviewNotesComponent,        
        ReviewNoteFormComponent
    ],
    providers: [],
})
export class ReviewNotesModule { }
