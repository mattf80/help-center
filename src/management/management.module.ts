
import { AuthGuard } from './../auth/shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//shared modules
import { SharedModule } from './shared/shared.module';

export const ROUTES: Routes = [
    {
        path: 'inbox', canActivate: [AuthGuard], loadChildren: './inbox/inbox.module#InboxModule'
    },
    {
        path: 'articles', canActivate: [AuthGuard], loadChildren: './articles/articles.module#ArticlesModule'
    },
    {
        path: 'macros', canActivate: [AuthGuard], loadChildren: './macros/macros.module#MacrosModule'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES),
        SharedModule.forRoot()
    ],
    exports: []
})
export class ManagementModule { }
