import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../model/course';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CourseEntityService } from '../services/course-entity.service';

export interface IDialogData {
    dialogTitle: string;
    course?: Course;
    mode: 'update' | 'create';
};

@Component({
    selector: 'course-dialog',
    templateUrl: './edit-course-dialog.component.html',
    styleUrls: ['./edit-course-dialog.component.css'],
})
export class EditCourseDialogComponent {

    public form: FormGroup;
    public loading$: Observable<boolean>;
    public data: IDialogData;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<EditCourseDialogComponent>,
        private coursesService: CourseEntityService,
        @Inject(MAT_DIALOG_DATA) data: IDialogData,
    ) {
        this.data = data;
        const formControls = {
            description: ['', Validators.required],
            category: ['', Validators.required],
            longDescription: ['', Validators.required],
            promo: ['', []],
        };

        if (this.data.mode == 'update') {
            this.form = this.fb.group(formControls);
            this.form.patchValue({ ...data.course });
        }
        else if (this.data.mode == 'create') {
            this.form = this.fb.group({
                ...formControls,
                url: ['', Validators.required],
                iconUrl: ['', Validators.required],
            });
        }
    }

    public onClose(): void {
        this.dialogRef.close();
    }

    public onSave(): void {
        const course: Course = {
            ...this.data.course,
            ...this.form.value,
        };
        if (this.data.mode === 'update') {
            this.coursesService.update(course);
            this.dialogRef.close();
        } else if (this.data.mode === 'create') {
            this.coursesService.add(course).subscribe(() => this.dialogRef.close());
        }
    }
}
