import { Router } from '@angular/router';
import { Store } from './../../../../store';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Component, OnInit, OnDestroy } from '@angular/core';

import { Article, ArticlesService } from './../../../shared/services/articles/articles.service';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {

  articles$: Observable<Article[]>
  subscription: Subscription;

  constructor(
    private articlesService: ArticlesService,
    private store: Store,
    private router: Router
  ) { }

  ngOnInit() {
    this.articles$ = this.store.select<Article[]>('articles');
    this.subscription = this.articlesService.articles$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  goToArticle(article: Article) {
    this.router.navigate([`../articles/${article.$key}`])
  }

}
