import { ReviewNote } from './../../../shared/services/review-notes/review-note.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-review-note',
    templateUrl: 'review-note.component.html'
})

export class ReviewNoteComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

    addReviewNote(event: ReviewNote) {
        console.log(event);
    }
}