import { Observable } from 'rxjs/Observable';
import { FirebaseArticle } from './../../../shared/services/articles/fb-articles.service';
import { ReviewNote, ReviewNotesService } from './../../../shared/services/review-notes/review-note.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'review-notes',
    styleUrls: ['review-notes.component.scss'],
    templateUrl: 'review-notes.component.html'
})

export class ReviewNotesComponent implements OnInit {

    @Input()
    fbArticle: FirebaseArticle;

    reviewNotes$: Observable<ReviewNote[]>;
    
    constructor(private reviewNotesService: ReviewNotesService) { }

    ngOnInit() {
        this.reviewNotes$= this.reviewNotesService.getReviewNotesForArticle(this.fbArticle.id);
     }
}