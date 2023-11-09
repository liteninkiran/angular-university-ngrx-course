import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './action-types';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

    private loginSideEffect$ = this.actions$.pipe(
        ofType(AuthActions.login),
        tap(action => localStorage.setItem('user', JSON.stringify(action.user))),
    );

    private logoutSideEffect$ = this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(action => {
            localStorage.removeItem('user');
            this.router.navigateByUrl('/login');
        })
    );

    public logout$ = createEffect(() => this.logoutSideEffect$, { dispatch: false });
    public login$ = createEffect(() => this.loginSideEffect$, { dispatch: false });

    constructor(
        private actions$: Actions,
        private router: Router,
    ) { }
}
