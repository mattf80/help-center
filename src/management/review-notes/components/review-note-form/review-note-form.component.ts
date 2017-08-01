import { FirebaseArticle } from './../../../shared/services/articles/fb-articles.service';
import { ReviewNote } from './../../../shared/services/review-notes/review-note.service';
import { Component, OnInit, Output, Input, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-review-note-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['review-note-form.component.scss'],
    templateUrl: 'review-note-form.component.html'
})

export class ReviewNoteFormComponent implements OnInit {

    @Input()
    fbArticle: FirebaseArticle;

    @Output()
    create = new EventEmitter<ReviewNote>();

    form = this.fb.group({
        user: this.fb.group({
            displayName: ['']
        }),
        body: ['', Validators.required],
        dateAdded: ['']
    })

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit() { }

    createReviewNote(){
        this.create.emit(this.form.value);
    }
}