import { createReducer, on } from '@ngrx/store';
import { Course, compareCourses } from '../model/course';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { CourseActions } from '../action-types';

export interface CoursesState extends EntityState<Course> {
}

export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses,
});

export const initialCoursesState = adapter.getInitialState({
});

export const coursesReducer = createReducer(
    initialCoursesState,
    on(CourseActions.allCoursesLoaded, (state, action) => adapter.setAll(action.courses, state)),
);

export const { selectAll } = adapter.getSelectors();
