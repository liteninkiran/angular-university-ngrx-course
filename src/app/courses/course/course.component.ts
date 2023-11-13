import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import { Observable, of } from 'rxjs';
import { Lesson } from '../model/lesson';
import { concatMap, map, tap } from 'rxjs/operators';
import { CoursesHttpService } from '../services/courses-http.service';
import { CourseEntityService } from '../services/course-entity.service';
import { LessonEntityService } from '../services/lesson-entity.service';

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {

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
        this.lessons$ = of([]);
    }

    public loadLessonsPage(course: Course): void {

    }
}
