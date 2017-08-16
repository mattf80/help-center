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

    currentExpiryDate: string;
    date: moment.Moment = moment();
    monthsToAdd: number = 6;

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

    addMonths(value: number) {
        let newDate = moment();
        newDate.add(value, 'months');
        console.log(newDate.toDate());
        this.form.patchValue({ expiryDate: newDate.toString() })
    }

    ngOnInit() {
        this.newExpiryDate = new Date().toLocaleDateString();
    }

    updateFbArticle() {
        this.updatingArticle.emit(this.form.value)
    }
}