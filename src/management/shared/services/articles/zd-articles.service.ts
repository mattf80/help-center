import { Observable } from 'rxjs/Observable';
import { Store } from './../../../../store';
import { AuthService } from './../../../../auth/shared/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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

interface AuthResponse {
    token: any;
}

export interface ZendeskArticle {
    article: {
        id: number,
        title: string,
        draft: boolean,
        promoted: boolean,
        comments_disabled: boolean,
        created_at: string,
        updated_at: string,
        label_names: Array<string>,
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
        oauthtoken: localStorage.getItem('zdauth'),
        remoteUri: 'https://esolhelpdesk1380528590.zendesk.com/api/v2/help_center/articles'
    }
    firebasetoken: string;

    constructor(
        private store: Store,
        private authService: AuthService,
        private http: HttpClient
    ) {
        this.authService.currentToken.then(token => {
            this.firebasetoken = token
        });
    }

    get uid() {
        return this.authService.user.uid;
    }

    getArticleFromZendesk(articleId: number) {
        return this.http.get<ItemResponse>(`${this.zendeskClient.remoteUri}/${articleId}.json?include=users`, {
            headers: new HttpHeaders({ 'Authorization': `Bearer ${this.zendeskClient.oauthtoken}` })
        });
    }

    updateArticle(articleId: number, flags: any) {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            //.set('Authorization', `Bearer ${this.zendeskClient.oAuth}`)
            .set('Authorization', `Bearer ${this.zendeskClient.oauthtoken}`);

        let body = { "translation": flags };

        return this.http.put<ItemResponse>(`${this.zendeskClient.remoteUri}/${articleId}/translations/en-gb.json`, body,
            { headers })
            .do(data => console.log(data));
    }

    getAuthToken() {
        return this.http.get<AuthResponse>('http://localhost:3000/api/zendesk/zd_oauth', {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.firebasetoken}`)
        })
            .map(response => response.token.full_token)
            .do(response => localStorage.setItem('zdauth', response))
    }

}
