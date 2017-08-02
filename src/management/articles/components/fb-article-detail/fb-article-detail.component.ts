import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { FirebaseArticle } from './../../../shared/services/articles/fb-articles.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';


@Component({
    selector: 'fb-article-detail',
    styleUrls: ['fb-article-detail.component.scss'],
    templateUrl: 'fb-article-detail.component.html'
})

export class FirebaseArticleDetailComponent implements OnInit {

    @Input()
    fbArticle: FirebaseArticle

    model: NgbDateStruct;
    currentExpiryDate: string;
    date: moment.Moment;

    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.model = {year: moment(this.fbArticle.expiryDate).year(), month: moment(this.fbArticle.expiryDate).month()+1, day: moment(this.fbArticle.expiryDate).date()}
    }

    onSubmit() {
        let epoch = new Date(this.model).getTime();
        console.log(this.model)
    }
}