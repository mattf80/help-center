import { FirebaseArticle } from './../articles/fb-articles.service';
import { Observable } from 'rxjs/Observable';
import { Store } from './../../../../store';
import { AuthService } from './../../../../auth/shared/services/auth/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';

import { Injectable } from '@angular/core';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/combineLatest';

import { Subject } from "rxjs/Subject";

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

    findArticleById(articleId: number): Observable<FirebaseArticle> {
        return this.db.list('/articles/', {
            query: {
                orderByChild: 'id',
                equalTo: articleId
            }
        })
            .map(results => results[0])
    }

    getReviewNotesForArticle(articleId: number): Observable<ReviewNote[]> {
        const article$ = this.findArticleById(articleId);

        const notesPerArticle$ = article$
            .switchMap(article => this.db.list('/articles-reviewNotes/' + article.$key));
            

        return notesPerArticle$
            .map(rnspa => rnspa.map(rnpa => this.db.object('/reviewNotes/' + rnpa.$key)))
            .mergeMap(fbojs => Observable.combineLatest(fbojs))

        // return notesForArticle$
        //   .map(ReviewNote.fromJsonList);
    }

    createReviewNote(articleKey: string, reviewNote: ReviewNote) {
        const user = this.authService.user;

        reviewNote.dateAdded = new Date().getTime().toString();
        reviewNote.user.displayName = user.email;
        const formattedReviewNote = Object.assign({}, reviewNote, { articleKey });

        const newNoteKey = this.db.database.ref('/reviewNotes').push().key;

        let dataToSave = {};
        dataToSave['/reviewNotes/' + newNoteKey] = formattedReviewNote;
        dataToSave[`/articles-reviewNotes/${articleKey}/${newNoteKey}`] = true;

        return this.firebaseUpdate(dataToSave);
    }

    firebaseUpdate(dataToSave) {
        const subject = new Subject();
        this.db.database.ref().update(dataToSave)
            .then(
            val => {
                subject.next(val);
                subject.complete();
            },
            err => {
                subject.error(err);
                subject.complete();
            }
            );

        return subject.asObservable();
    }
}