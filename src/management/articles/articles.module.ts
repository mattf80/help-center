
import { ReviewNoteFormComponent } from './../review-notes/components/review-note-form/review-note-form.component';

import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ArticlesComponent } from './containers/articles/articles.component';
import { ArticleComponent } from './containers/article/article.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';


export const ROUTES: Routes = [
    {
        path: '', component: ArticlesComponent        
    },
    {
        path: ':id', component: ArticleComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        NgbModule,
        SharedModule
    ],
    exports: [],
    declarations: [
        ArticlesComponent,
        ArticleComponent,
        ReviewNoteFormComponent,
        ArticleDetailComponent
    ]
})
export class ArticlesModule { }
