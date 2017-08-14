import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { FirebaseArticle } from './../../../shared/services/articles/fb-articles.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
    selector: 'fb-article-detail',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['fb-article-detail.component.scss'],
    templateUrl: 'fb-article-detail.component.html'
})

export class FirebaseArticleDetailComponent implements OnInit, OnChanges {

    @Input()
    fbArticle: FirebaseArticle

    @Output()
    updatingArticle = new EventEmitter<FirebaseArticle>();

    model: NgbDateStruct;
    currentExpiryDate: string;
    date: moment.Moment;

    form = this.fb.group({
        expiryDate: ['']
    });

    newExpiryDate: any;

    constructor(private fb: FormBuilder) {
    }

    ngOnChanges(){
        if (this.fbArticle && this.fbArticle.expiryDate) {
            const value = this.fbArticle;
            this.form.patchValue(value);

        }
    }

    ngOnInit() {
        this.model = {year: moment(this.fbArticle.expiryDate).year(), month: moment(this.fbArticle.expiryDate).month()+1, day: moment(this.fbArticle.expiryDate).date()};
        this.newExpiryDate = new Date().toLocaleDateString();
    }

    updateFbArticle() {
        this.updatingArticle.emit(this.form.value)
    }
}