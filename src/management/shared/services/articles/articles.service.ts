import { ReviewNote } from './../review-notes/review-note.service';
import { Observable } from 'rxjs/Observable';
import { Store } from './../../../../store';
import { AuthService } from './../../../../auth/shared/services/auth/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../../../environments/environment';

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

export interface Article {
    id: number,
    title: string,
    reviewNotes: ReviewNote[],
    expiryDate: string,
    draft: boolean,
    promoted: boolean,
    user: {
        photo: {
            content_url: string
        }
    },
    $key: string,
    $exists: () => boolean
}


@Injectable()
export class ArticlesService {


    zendeskClient = {
        username: 'frowe.m@cambridgeesol.org',
        token: environment.zendesk.token,
        remoteUri: 'https://esolhelpdesk1380528590.zendesk.com/api/v2/help_center/articles'
    }


    auth = btoa(this.zendeskClient.username + '/token:' + this.zendeskClient.token);

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

    getArticleFromFirebase(id: number) {
        if (!id) return Observable.of({});
        return this.store.select<Article[]>('articles')
            .filter(Boolean)
            .map(articles => articles.find((article: Article) => article.id === id))           

    }

    findArticleById(articleId: number): Observable<Article> {
        return this.db.list('esolhelpdesk1380528590/articles/', {
            query: {
                orderByChild: 'id',
                equalTo: articleId
            }
        })
            .map(results => results[0]);
    }

    getArticleFromZendesk(articleId: number) {

        return this.http.get<ItemsResponse>(`${this.zendeskClient.remoteUri}/${articleId}.json?include=users`, {
            headers: new HttpHeaders({ 'Authorization': `Basic ${this.auth}` })
        });
    }

    updateArticle(articleId: number, draftStatus: boolean) {
        //console.log("From the service: ", draftStatus)
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', `Basic ${this.auth}`);

        let body = { "translation": { "draft": true } };

        return this.http.patch<ItemResponse>(`${this.zendeskClient.remoteUri}/${articleId}/translations/en-gb.json`, body,
            { headers })
            .do(data => console.log(data));
    }
}