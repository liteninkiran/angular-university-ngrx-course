import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { compareCourses, Course } from '../model/course';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { CoursesHttpService } from '../services/courses-http.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

    public promoTotal$: Observable<number>;
    public loading$: Observable<boolean>;
    public beginnerCourses$: Observable<Course[]>;
    public advancedCourses$: Observable<Course[]>;

    constructor(
        private dialog: MatDialog,
        private coursesHttpService: CoursesHttpService,
    ) { }

    public ngOnInit(): void {
        this.reload();
    }

    public reload(): void {
        const courses$ = this.coursesHttpService.findAllCourses().pipe(
            map(courses => courses.sort(compareCourses)),
            shareReplay(),
        );
        const mapCourses = (category: string) => {
            return map((courses: Course[]) => filterCoursesByCategory(courses, category));
        }
        const filterCoursesByCategory = (courses: Course[], category: string): Course[] => {
            return courses.filter(course => course.category === category);
        }
        this.loading$ = courses$.pipe(map(courses => !!courses));
        this.beginnerCourses$ = courses$.pipe(mapCourses('BEGINNER'));
        this.advancedCourses$ = courses$.pipe(mapCourses('ADVANCED'));
        this.promoTotal$ = courses$.pipe(map(courses => courses.filter(course => course.promo).length));
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
