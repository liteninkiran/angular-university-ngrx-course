import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../model/course';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IDialogData } from '../courses-card-list/courses-card-list.component';
import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { courseUpdated } from '../course.actions';

@Component({
    selector: 'course-dialog',
    templateUrl: './edit-course-dialog.component.html',
    styleUrls: ['./edit-course-dialog.component.css'],
})
export class EditCourseDialogComponent {

    public form: FormGroup;
    public data: IDialogData;
    public loading$: Observable<boolean>;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<EditCourseDialogComponent>,
        private store: Store<AppState>,
        @Inject(MAT_DIALOG_DATA) data: IDialogData,
    ) {
        this.data = data;

        const formControls = {
            description: ['', Validators.required],
            category: ['', Validators.required],
            longDescription: ['', Validators.required],
            promo: ['', []],
        };

        if (this.data.mode === 'update') {
            this.form = this.fb.group(formControls);
            this.form.patchValue({ ...data.course });
        }
        else if (this.data.mode === 'create') {
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
        const course: Course = { ...this.data.course, ...this.form.value }
        const update: Update<Course> = { id: course.id, changes: course }
        this.store.dispatch(courseUpdated({ update }));
        this.dialogRef.close();
    }
}
