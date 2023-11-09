import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '../reducers';
import { Store, select } from '@ngrx/store';
import { isLoggedIn } from './auth.selectors';
import { tap } from 'rxjs/operators';

export const AuthGaurd: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
): Observable<boolean> => {

    const router: Router = inject(Router);
    const store: Store<AppState> = inject(Store<AppState>);

    return store.pipe(select(isLoggedIn), tap(loggedIn => {
        if (!loggedIn) {
            router.navigateByUrl('/login');
        }
    }));
}

