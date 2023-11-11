import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { AppState } from '../../reducers';
import { Store, select } from '@ngrx/store';
import { Course } from '../model/course';
import { selectAdvancedCourses, selectBeginnerCourses, selectPromoTotal } from '../courses.selectors';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

    public promoTotal$: Observable<number>;
    public beginnerCourses$: Observable<Course[]>;
    public advancedCourses$: Observable<Course[]>;

    constructor(
        private dialog: MatDialog,
        private store: Store<AppState>,
    ) { }

    public ngOnInit(): void {
        this.reload();
    }

    public reload(): void {
        this.beginnerCourses$ = this.store.pipe(select(selectBeginnerCourses));
        this.advancedCourses$ = this.store.pipe(select(selectAdvancedCourses));
        this.promoTotal$ = this.store.pipe(select(selectPromoTotal));
    }

    public onAddCourse(): void {
        const dialogConfig = defaultDialogConfig();
        dialogConfig.data = {
            dialogTitle: 'Create Course',
            mode: 'create',
        };
        this.dialog.open(EditCourseDialogComponent, dialogConfig);
    }
}
