import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import { map } from 'rxjs/operators';
import { Lesson } from '../model/lesson';

@Injectable()
export class CoursesHttpService {

    constructor(private http: HttpClient) {

    }

    public findAllCourses(): Observable<Course[]> {
        return this.http
            .get('/api/courses')
            .pipe(map(res => res['payload']));
    }

    public findCourseByUrl(courseUrl: string): Observable<Course> {
        const url = `/api/courses/${courseUrl}`;
        return this.http.get<Course>(url);
    }

    public findLessons(courseId: number, pageNumber = 0, pageSize = 3): Observable<Lesson[]> {
        const url = '/api/lessons';
        const params = {
            params: new HttpParams()
                .set('courseId', courseId.toString())
                .set('sortOrder', 'asc')
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
        }
        return this.http.get<Lesson[]>(url, params);
    }


    public saveCourse(courseId: number | string, changes: Partial<Course>): Observable<any> {
        const url = `/api/courses/${courseId}`;
        return this.http.put(url, changes);
    }
}
