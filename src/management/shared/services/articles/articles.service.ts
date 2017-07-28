import { Observable } from 'rxjs/Observable';
import { Store } from './../../../../store';
import { AuthService } from './../../../../auth/shared/services/auth/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/do';

interface ItemsResponse {
  results: Array<any>;
}

export interface Article {
    id: number,
    title: string,
    reviewNotes: Array<any>,
    expiryDate: string,
    $key: string,
    $exists: () => boolean
}


@Injectable()
export class ArticlesService {
    

    zendeskClient = {
        username: 'frowe.m@cambridgeesol.org',
        token: 'config',
        remoteUri: 'https://esolhelpdesk1380528590.zendesk.com/api/v2/help_center/articles'
    }

    articles$: Observable<Article[]> = this.db.list(`articles`)
        .do(next => {
            this.store.set('articles', next);
        })


    constructor(
        private store: Store,
        private db: AngularFireDatabase,
        private authService: AuthService,
        private http: HttpClient
    ) { }

    get uid() {
        return this.authService.user.uid;
    }

    getArticleFromZendesk(articleId: number) {
        const auth = btoa(this.zendeskClient.username + '/token:' + this.zendeskClient.token);

        return this.http.get<ItemsResponse>(`${this.zendeskClient.remoteUri}/${articleId}.json?include=users`, {
            headers: new HttpHeaders({ 'Authorization': `Basic ${auth}` })
        });

    }
}