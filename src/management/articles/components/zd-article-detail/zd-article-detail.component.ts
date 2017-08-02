import { ZendeskArticle } from './../../../shared/services/articles/zd-articles.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import 'rxjs/add/operator/map';

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
            id: this.zdarticle.article.id,
            flags: this.fb.group({
                draft: this.zdarticle.article.draft,
                outdated: this.zdarticle.article.outdated,
                promoted: this.zdarticle.article.promoted
            })
        });

        this.form.get('flags').valueChanges
            .distinctUntilChanged()
            .subscribe(value => {
                let toSave = this.prepareSave(value);
                this.changes.emit(toSave);
            });
    }
    prepareSave(value) {
        const formModel = this.form.value;

        const saveArticle: any = {
            id: this.zdarticle.article.id,
            flags: value
        };
        return saveArticle;
    }
}