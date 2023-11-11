import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Course } from '../model/course';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CourseEntityService } from '../services/course-entity.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    promoTotal$: Observable<number>;
    loading$: Observable<boolean>;
    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    constructor(
        private dialog: MatDialog,
        private coursesService: CourseEntityService,
    ) {

    }

    public ngOnInit(): void {
        this.reload();
    }

    public reload(): void {
        this.beginnerCourses$ = this.coursesService.entities$.pipe(map(courses => courses.filter(course => course.category == 'BEGINNER')));
        this.advancedCourses$ = this.coursesService.entities$.pipe(map(courses => courses.filter(course => course.category == 'ADVANCED')));
        this.promoTotal$ = this.coursesService.entities$.pipe(map(courses => courses.filter(course => course.promo).length));
    }

    public onAddCourse(): void {
        const dialogConfig = defaultDialogConfig();
        dialogConfig.data = {
            dialogTitle: 'Create Course',
            mode: 'create'
        };
        this.dialog.open(EditCourseDialogComponent, dialogConfig);
    }
}
