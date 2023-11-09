import { createSelector } from '@ngrx/store';

export const isLoggedIn = createSelector(
    (state: any) => state.auth,
    (auth) => !!auth.user,
);

export const isLoggedOut = createSelector(
    isLoggedIn,
    loggedIn => !loggedIn,
);
