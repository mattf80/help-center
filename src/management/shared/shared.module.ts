
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
//third party modules
import { AngularFireDatabaseModule } from 'angularfire2/database';

//components
import { ListItemComponent } from './components/list-item/list-item.component';

//services
import { ArticlesService } from './services/articles/articles.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AngularFireDatabaseModule,
        FlexLayoutModule
    ],
    exports: [
        ListItemComponent,
        FlexLayoutModule
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
                ArticlesService
            ]
        }
    }
 }
