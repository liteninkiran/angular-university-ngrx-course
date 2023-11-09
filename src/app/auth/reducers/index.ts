import { ActionReducerMap, on, createReducer } from '@ngrx/store';
import { User } from '../model/user.model';
import { AuthActions } from '../action-types';

export const authFeatureKey = 'auth';

export interface AuthState {
    user: User;
}

export const initialAuthState: AuthState = {
    user: undefined,
}

export const authReducer = createReducer(
    initialAuthState,
    on(AuthActions.login, (state, action) => ({ user: action.user })),
    on(AuthActions.logout, (state, action) => ({ user: undefined })),
);
