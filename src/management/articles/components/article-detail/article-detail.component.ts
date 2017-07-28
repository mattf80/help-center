import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
    selector: 'app-article-detail',
    styleUrls: ['article-detail.component.scss'],
    templateUrl: 'article-detail.component.html'
})

export class ArticleDetailComponent implements OnInit {

    @Input()
    article: any;

    draftCheckboxGroupForm = this.fb.group({
        draft: true,
        published: false
    })

    constructor(private fb: FormBuilder) { }

    ngOnInit() {

     }
}