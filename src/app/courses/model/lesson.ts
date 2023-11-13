export interface Lesson {
    id: number;
    description: string;
    duration: string;
    seqNo: number;
    courseId: number;
}

export function compareLessons(l1: Lesson, l2: Lesson): number {
    const compareCourses = l1.courseId - l2.courseId;
    return compareCourses === 0 ? l1.seqNo - l2.seqNo : (compareCourses > 0 ? 1 : -1);
}
