import { Subscription } from 'rxjs/Subscription';
import { Article } from 'management/shared/services/articles/articles.service';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ArticlesService } from './../../../shared/services/articles/articles.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import 'rxjs/add/operator//switchMap';

@Component({
    selector: 'app-article',
    styleUrls: ['article.component.scss'],
    templateUrl: 'article.component.html'
})

export class ArticleComponent implements OnInit, OnDestroy {

    article$: Observable<Article>;
    subscription: Subscription;

    zdarticle$: Observable<any>;

    constructor(
        private articlesService: ArticlesService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.subscription = this.articlesService.articles$.subscribe();
        this.article$ = this.route.params
            .switchMap(param => this.articlesService.getArticleFromFirebase(+param.id));

        this.zdarticle$ = this.route.params
            .switchMap(param => this.articlesService.getArticleFromZendesk(+param.id));
        
        // this.articlesService.getArticleFromZendesk(115000211763).subscribe(result => {
        //     this.zdarticle = result['article'];
        //     this.zdarticle.user = result['users'][0];
        // })

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    async updateArticle(event: FormGroup) {
        try {
            console.log(event.value);
            this.articlesService.updateArticle(115000211763, event.value).subscribe(result => {
                console.log(result);
            });
        } catch (error) {
            console.log(error.message);
        }
    }
}