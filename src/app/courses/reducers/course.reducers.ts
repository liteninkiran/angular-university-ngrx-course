import { createReducer, on } from '@ngrx/store';
import { Course, compareCourses } from '../model/course';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { CourseActions } from '../action-types';

export interface CoursesState extends EntityState<Course> {
    allCoursesLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses,
});

export const initialCoursesState = adapter.getInitialState({
    allCoursesLoaded: false,
});

export const coursesReducer = createReducer(
    initialCoursesState,
    on(CourseActions.allCoursesLoaded, (state, action) => {
        const newState = { ...state, allCoursesLoaded: true }
        return adapter.setAll(action.courses, newState);
    }),
);

export const { selectAll } = adapter.getSelectors();
