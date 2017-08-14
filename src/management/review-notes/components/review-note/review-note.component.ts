import { ReviewNote } from './../../../shared/services/review-notes/review-note.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-review-note',
    styleUrls: ['review-note.component.scss'],
    templateUrl: 'review-note.component.html'
})

export class ReviewNoteComponent implements OnInit {

    @Input()
    reviewNote: ReviewNote;
    
    constructor() { }

    ngOnInit() { 
        
    }


}