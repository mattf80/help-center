import { ReviewNote, ReviewNotesService } from './../../../shared/services/review-notes/review-note.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ZendeskArticlesService, ZendeskArticle } from './../../../shared/services/articles/zd-articles.service';

import { FirebaseArticlesService, FirebaseArticle } from './../../../shared/services/articles/fb-articles.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import 'rxjs/add/operator//switchMap';

@Component({
    selector: 'app-article',
    styleUrls: ['article.component.scss'],
    templateUrl: 'article.component.html'
})

export class ArticleComponent implements OnInit, OnDestroy {

    zdarticle$: Observable<ZendeskArticle>;
    fbArticle$: Observable<FirebaseArticle>;
    fbsubscription: Subscription;
    articleKey: string;

    constructor(
        private zdArticlesService: ZendeskArticlesService,
        private fbArticlesService: FirebaseArticlesService,
        private reviewNoteService: ReviewNotesService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.authorise();
        this.fbsubscription = this.fbArticlesService.articles$.subscribe();
        this.fbArticle$ = this.route.params
            .switchMap(param => this.fbArticlesService.getArticleFromFirebase(+param.id));

        this.zdarticle$ = this.route.params
            .switchMap(param => this.zdArticlesService.getArticleFromZendesk(+param.id));

        // this.articlesService.getArticleFromZendesk(115000211763).subscribe(result => {
        //     this.zdarticle = result['article'];
        //     this.zdarticle.user = result['users'][0];
        // })
    }

    ngOnDestroy() {
        this.fbsubscription.unsubscribe();
    }

    async updateArticle(event: any) {

        try {
            console.log(event);
            this.zdArticlesService.updateArticle(event.id, event.flags).subscribe(result => {
                console.log(result);
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    getArticleKey() {
        return this.fbArticle$.subscribe(article => {
            this.articleKey = article.$key
        });
    }

    createReviewNote(event: ReviewNote) {
        this.getArticleKey();
        this.reviewNoteService.createReviewNote(this.articleKey, event);
    }

    authorise() {
        let existingtoken = localStorage.getItem('zdauth');
        if (existingtoken) {
            console.log("Existing token found...");
            return existingtoken;
        } else {
            this.zdArticlesService.getAuthToken().subscribe(result => {
                console.log("New token fetched: ", result);
            })
        }
    }

    async updateFbArticle(event: FirebaseArticle) {
        this.getArticleKey();
        const savedArticle = await this.fbArticlesService.updateFbArticle(this.articleKey, event);
    }
}