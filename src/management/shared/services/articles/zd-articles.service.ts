import { Observable } from 'rxjs/Observable';
import { Store } from './../../../../store';
import { AuthService } from './../../../../auth/shared/services/auth/auth.service';
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

export interface ZendeskArticle {
    article: {
        id: number,
        title: string,
        draft: boolean,
        promoted: boolean,
        outdated: boolean,
        user: {
            photo: {
                content_url: string
            }
        }
    }
}

@Injectable()
export class ZendeskArticlesService {

    zendeskClient = {
        username: 'frowe.m@cambridgeesol.org',
        token: environment.zendesk.token,
        remoteUri: 'https://esolhelpdesk1380528590.zendesk.com/api/v2/help_center/articles'
    }

    auth = btoa(this.zendeskClient.username + '/token:' + this.zendeskClient.token);

    constructor(
        private store: Store,
        private authService: AuthService,
        private http: HttpClient
    ) { }

    get uid() {
        return this.authService.user.uid;
    }

    getArticleFromZendesk(articleId: number) {
        return this.http.get<ItemResponse>(`${this.zendeskClient.remoteUri}/${articleId}.json?include=users`, {
            headers: new HttpHeaders({ 'Authorization': `Basic ${this.auth}` })
        });
    }

    updateArticle(articleId: number, draftStatus: boolean) {
        //console.log("From the service: ", draftStatus)
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', `Basic ${this.auth}`);

        let body = { "translation": { "draft": true } };

        return this.http.put<ItemResponse>(`${this.zendeskClient.remoteUri}/${articleId}/translations/en-gb.json`, body,
            { headers })
            .do(data => console.log(data));
    }
}