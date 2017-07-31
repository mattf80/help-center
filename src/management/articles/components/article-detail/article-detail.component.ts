import { Article } from './../../../shared/services/articles/articles.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-article-detail',
    styleUrls: ['article-detail.component.scss'],
    templateUrl: 'article-detail.component.html'
})

export class ArticleDetailComponent implements OnInit, OnChanges {

    @Input()
    article: Article;

    @Input()
    zdarticle: any;

    @Output()
    changes = new EventEmitter<FormGroup>();

    form: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.form = this.fb.group({
            draft: '',
            outdated: '',
            promoted: ''
        });

        // this.form.get('draft').valueChanges.subscribe(value => {
        //     console.log(value);
        //     this.changes.emit(this.form);
        // });
     }

     ngOnChanges(changes: SimpleChanges) {
        if (changes.zdarticle.currentValue) {
            const x = changes.zdarticle.currentValue;
            this.populateForm(x.article);
        };
        
     }

     populateForm(article: any) {
         console.log(article);
         this.form.patchValue({
             draft: article.draft,
             outdated: article.outdated,
             promoted: article.promoted
         });
     }
}