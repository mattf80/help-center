import { Observable } from 'rxjs/Observable';
import { Store } from './../../../../store';
import { AuthService } from './../../../../auth/shared/services/auth/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/do';

export interface ReviewNote {
    body: string,
    user: {
        displayName: string
    },
    dateAdded: string,
    $key: string,
    $exists: () => boolean
}

@Injectable()
export class ReviewNotesService {

    reviewnotes$: Observable<ReviewNote[]> = this.db.list(`review-notes`)
        .do(next => {
            this.store.set('review-notes', next);
        })

    constructor(
        private store: Store,
        private db: AngularFireDatabase,
        private authService: AuthService
    ) { }

    createReviewNote(articleKey: string, reviewNote: ReviewNote) {
        const user = this.authService.user;
        console.log(user);

        reviewNote.dateAdded = new Date().getTime().toString();
        reviewNote.user.displayName = user.email;
        const formattedReviewNote = Object.assign({}, reviewNote, { articleKey });
        console.log(formattedReviewNote);
    }
}