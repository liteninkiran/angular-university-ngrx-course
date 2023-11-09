import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '../reducers';
import { Store, select } from '@ngrx/store';
import { isLoggedIn } from './auth.selectors';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGaurd implements CanActivate {

    constructor(
        private store: Store<AppState>,
        private router: Router,
    ) {

    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.pipe(select(isLoggedIn), tap(loggedIn => {
            if (!loggedIn) {
                this.router.navigateByUrl('/login');
            }
        }));
    }
}
