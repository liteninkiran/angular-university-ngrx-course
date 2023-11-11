export interface Course {
    id: number;
    seqNo: number;
    url: string;
    iconUrl: string;
    courseListIcon: string;
    description: string;
    longDescription?: string;
    category: string;
    lessonsCount: number;
    promo: boolean;
}

export function compareCourses(c1: Course, c2: Course) {
    const compare = c1.seqNo - c2.seqNo;
    return compare > 0 ? 1 : (compare < 0 ? -1 : 0);
}
