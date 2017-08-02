import { AuthService } from './../../../../auth/shared/services/auth/auth.service';
import { Store } from './../../../../store';
import { ReviewNote } from './../review-notes/review-note.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

interface ItemsResponse {
    results: Array<any>;
}

interface ItemResponse {
    article: any;
}

export interface FirebaseArticle {
    id: number,
    title: string,
    reviewNotes: ReviewNote[],
    expiryDate: number,
    $key: string,
    $exists: () => boolean
}

@Injectable()
export class FirebaseArticlesService {

    articles$: Observable<FirebaseArticle[]> = this.db.list(`articles`)
        .do(next => {
            this.store.set('articles', next);
        })

    constructor(
        private store: Store,
        private db: AngularFireDatabase,
        private authService: AuthService,
    ) { }

    get uid() {
        return this.authService.user.uid;
    }

    getArticleFromFirebase(id: number) {
        if (!id) return Observable.of({});
        return this.store.select<FirebaseArticle[]>('articles')
            .filter(Boolean)
            .map(articles => articles.find((article: FirebaseArticle) => article.id === id))

    }

    findArticleById(articleId: number): Observable<FirebaseArticle> {
        return this.db.list('/articles/', {
            query: {
                orderByChild: 'id',
                equalTo: articleId
            }
        })
            .map(results => results[0]);
    }
}