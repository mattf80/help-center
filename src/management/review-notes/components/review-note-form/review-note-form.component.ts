import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-review-note-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['review-note-form.component.scss'],
    templateUrl: 'review-note-form.component.html'
})

export class ReviewNoteFormComponent implements OnInit {

    form = this.fb.group({
        body: ['', Validators.required]
    })

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit() { }

    createReviewNote(){
        console.log(this.form.value);
    }
}