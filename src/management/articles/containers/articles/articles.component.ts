import { Router } from '@angular/router';
import { Store } from './../../../../store';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Component, OnInit, OnDestroy } from '@angular/core';

import { FirebaseArticle, FirebaseArticlesService } from './../../../shared/services/articles/fb-articles.service';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {

  articles$: Observable<FirebaseArticle[]>
  subscription: Subscription;

  constructor(
    private articlesService: FirebaseArticlesService,
    private store: Store,
    private router: Router
  ) { }

  ngOnInit() {
    this.articles$ = this.store.select<FirebaseArticle[]>('articles');
    this.subscription = this.articlesService.articles$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  goToArticle(article: FirebaseArticle) {
    this.router.navigate([`../articles/${article.id}`])
  }

}
