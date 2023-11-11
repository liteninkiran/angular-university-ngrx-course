import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '../model/course';
import { MatDialog } from '@angular/material/dialog';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { defaultDialogConfig } from '../shared/default-dialog-config';

export interface IDialogData {
    dialogTitle: string;
    course: Course;
    mode: 'create' | 'update';
}

@Component({
    selector: 'courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrls: ['./courses-card-list.component.css'],
})
export class CoursesCardListComponent implements OnInit {

    @Input() public courses: Course[];

    @Output() public courseChanged = new EventEmitter();

    constructor(
        private dialog: MatDialog,
    ) { }

    public ngOnInit(): void {

    }

    public editCourse(course: Course): void {
        const dialogConfig = defaultDialogConfig();
        const data: IDialogData = {
            dialogTitle: 'Edit Course',
            course,
            mode: 'update',
        }
        dialogConfig.data = data;
        this.dialog.open(EditCourseDialogComponent, dialogConfig)
            .afterClosed()
            .subscribe(() => this.courseChanged.emit());
    }

    public onDeleteCourse(course: Course): void {

    }
}
