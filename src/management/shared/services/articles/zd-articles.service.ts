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
        remoteUri: 'https://esolhelpdesk1380528590.zendesk.com/api/v2/help_center/articles',
        oAuth: '55af4ab69fbf3e8f8c858cb5c68676956206ea24386950ebcda50d94019fefc7'
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

    authorizeZendesk() {
        return this.http.get<any>('https://esolhelpdesk1380528590.zendesk.com/oauth/authorizations/new', {
            params: new HttpParams()
                .set('response_type', 'code')
                .set('redirect_uri', 'http://localhost:4200/')
                .set('client_id', 'matts_app')
                .set('scope', 'read')
        });
    }

    getArticleFromZendesk(articleId: number) {
        return this.http.get<ItemResponse>(`${this.zendeskClient.remoteUri}/${articleId}.json?include=users`, {
            headers: new HttpHeaders({ 'Authorization': `Basic ${this.auth}` })
        });
    }

    updateArticle(articleId: number, flags: any) {
        //console.log("From the service: ", draftStatus)
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            //.set('Authorization', `Bearer ${this.zendeskClient.oAuth}`)
            .set('Authorization', `Basic ${this.auth}`);

        let body = { "translation": flags };

        return this.http.put<ItemResponse>(`${this.zendeskClient.remoteUri}/${articleId}/translations/en-gb.json`, body,
            { headers })
            .do(data => console.log(data));
    }
}