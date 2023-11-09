import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from './reducers';
import { Observable } from 'rxjs';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';
import { logout } from './auth/auth.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

    public loading = true;
    public isLoggedIn$: Observable<boolean>;
    public isLoggedOut$: Observable<boolean>;

    constructor(
        private router: Router,
        private store: Store<AppState>,
    ) {

    }

    public ngOnInit(): void {
        this.router.events.subscribe(event => {
            switch (true) {
                case event instanceof NavigationStart: {
                    this.loading = true;
                    break;
                }

                case event instanceof NavigationEnd:
                case event instanceof NavigationCancel:
                case event instanceof NavigationError: {
                    this.loading = false;
                    break;
                }
                default: {
                    break;
                }
            }
        });
        this.isLoggedIn$ = this.store.pipe(
            select(isLoggedIn)
        );
        this.isLoggedOut$ = this.store.pipe(
            select(isLoggedOut)
        );
    }

    public logout(): void {
        this.store.dispatch(logout());
    }
}
