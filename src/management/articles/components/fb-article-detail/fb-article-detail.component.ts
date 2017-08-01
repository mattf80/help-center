import { FirebaseArticle } from './../../../shared/services/articles/fb-articles.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'fb-article-detail',
    styleUrls: ['fb-article-detail.component.scss'],
    templateUrl: 'fb-article-detail.component.html'
})

export class FirebaseArticleDetailComponent implements OnInit {

    @Input()
    fbArticle: FirebaseArticle

    constructor() { }

    ngOnInit() { }
}