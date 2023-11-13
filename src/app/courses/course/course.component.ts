import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import { Observable, of } from 'rxjs';
import { Lesson } from '../model/lesson';
import { concatMap, delay, map, tap, withLatestFrom } from 'rxjs/operators';
import { CoursesHttpService } from '../services/courses-http.service';
import { CourseEntityService } from '../services/course-entity.service';
import { LessonEntityService } from '../services/lesson-entity.service';

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {

    public loading$: Observable<boolean>;
    public course$: Observable<Course>;
    public lessons$: Observable<Lesson[]>;
    public displayedColumns = ['seqNo', 'description', 'duration'];
    public nextPage = 0;


    constructor(
        private coursesService: CourseEntityService,
        private lessonsService: LessonEntityService,
        private route: ActivatedRoute,
    ) { }

    public ngOnInit(): void {
        const courseUrl = this.route.snapshot.paramMap.get('courseUrl');
        this.course$ = this.coursesService.entities$.pipe(
            map(courses => courses.find(course => course.url === courseUrl))
        );
        this.lessons$ = this.lessonsService.entities$.pipe(
            withLatestFrom(this.course$),
            tap(([lessons, course]) => this.nextPage === 0 ? this.loadLessonsPage(course) : this.noop()),
            map(([lessons, course]) => lessons.filter(lesson => lesson.courseId === course.id)),
        );
        this.loading$ = this.lessonsService.loading$.pipe(delay(0));
    }

    public loadLessonsPage(course: Course): void {
        this.lessonsService.getWithQuery({
            courseId: course.id.toString(),
            pageNumber: this.nextPage.toString(),
            pageSize: 3,
        });
        this.nextPage +=1;
    }

    public noop() {

    }
}
