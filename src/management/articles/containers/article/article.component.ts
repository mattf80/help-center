import { ArticlesService } from './../../../shared/services/articles/articles.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-article',
    styleUrls: ['article.component.scss'],
    templateUrl: 'article.component.html'
})

export class ArticleComponent implements OnInit {

    article: any;

    constructor(private articlesService: ArticlesService) { }

    ngOnInit() {
        this.articlesService.getArticleFromZendesk(115000211763)
            .subscribe((result) => {
                this.article = result['article'];
                this.article.user = result['users'][0];
            });
     }
}