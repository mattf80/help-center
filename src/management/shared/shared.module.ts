import { ReviewNotesService } from './services/review-notes/review-note.service';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
//third party modules
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//components
import { ListItemComponent } from './components/list-item/list-item.component';

//services
import { ZendeskArticlesService } from './services/articles/zd-articles.service';
import { FirebaseArticlesService } from './services/articles/fb-articles.service';

import { MdDatepickerModule, MdSlideToggleModule, MdInputModule, MdButtonToggleModule, MdButtonModule, MdIconModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AngularFireDatabaseModule,
        FlexLayoutModule,
        NgbModule,
        MdDatepickerModule,
        MdSlideToggleModule,
        MdInputModule,
        MdButtonToggleModule,
        MdButtonModule,
        MdIconModule
    ],
    exports: [
        ListItemComponent,
        FlexLayoutModule,
        MdDatepickerModule,
        MdSlideToggleModule,
        MdInputModule,
        MdButtonToggleModule,
        MdButtonModule,
        MdIconModule
    ],
    declarations: [
        ListItemComponent
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                ZendeskArticlesService,
                FirebaseArticlesService,
                ReviewNotesService
            ]
        }
    }
 }
