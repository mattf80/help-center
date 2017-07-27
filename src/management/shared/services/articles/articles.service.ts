import { Observable } from 'rxjs/Observable';
import { Store } from './../../../../store';
import { AuthService } from './../../../../auth/shared/services/auth/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/do';

export interface Article {
    title: string,
    reviewNotes: Array<any>,
    expiryDate: string,
    $key: string,
    $exists: () => boolean
}


@Injectable()
export class ArticlesService {

    articles$: Observable<Article[]> = this.db.list(`articles`)
        .do(next => {
            this.store.set('articles', next);
        })


    constructor(
        private store: Store,
        private db: AngularFireDatabase,
        private authService: AuthService
    ) { }

    get uid() {
        return this.authService.user.uid;
    }
}