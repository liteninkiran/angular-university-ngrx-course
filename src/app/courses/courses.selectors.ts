import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CoursesState} from './reducers/course.reducers';
import * as fromCourses from './reducers/course.reducers';
import { Course } from './model/course';

const beginnerCallback = (courses: Course[]) => filterCoursesByCategory(courses, 'BEGINNER')
const advancedCallback = (courses: Course[]) => filterCoursesByCategory(courses, 'ADVANCED')
const filterCoursesByCategory = (courses: Course[], category: string): Course[] => courses.filter(course => course.category === category)
const countPromotionalCourses = (courses: Course[]): number => courses.filter(course => course.promo).length

export const selectCoursesState = createFeatureSelector<CoursesState>('courses');
export const selectAllCourses = createSelector(selectCoursesState, fromCourses.selectAll);
export const selectBeginnerCourses = createSelector(selectAllCourses, beginnerCallback);
export const selectAdvancedCourses = createSelector(selectAllCourses, advancedCallback);
export const selectPromoTotal = createSelector(selectAllCourses, countPromotionalCourses);
