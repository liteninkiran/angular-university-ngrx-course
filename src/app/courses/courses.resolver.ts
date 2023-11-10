import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { Observable } from 'rxjs';
import { finalize, first, tap } from 'rxjs/operators';
import { loadAllCourses } from './course.actions';

@Injectable()
export class CoursesResolver implements Resolve<any> {

    public loading = false;

    constructor(private store: Store<AppState>) {

    }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.store.pipe(
            tap(() => {
                if (!this.loading) {
                    this.loading = true;
                    this.store.dispatch(loadAllCourses());
                }
            }),
            first(),
            finalize(() => this.loading = false),
        );
    }
}
