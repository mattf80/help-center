import { ZendeskArticle } from './../../../shared/services/articles/zd-articles.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'zd-article-detail',
    styleUrls: ['zd-article-detail.component.scss'],
    templateUrl: 'zd-article-detail.component.html'
})

export class ZendeskArticleDetailComponent implements OnInit {

    @Input()
    zdarticle: ZendeskArticle;

    @Output()
    changes = new EventEmitter<FormGroup>();

    form: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.form = this.fb.group({
            draft: this.zdarticle.article.draft,
            outdated: this.zdarticle.article.outdated,
            promoted: this.zdarticle.article.promoted
        });

        // this.form.get('draft').valueChanges.subscribe(value => {
        //     console.log(value);
        //     this.changes.emit(this.form);
        // });
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