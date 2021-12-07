import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Timestamp } from 'firebase/firestore';
import { Task } from 'src/app/shared/interfaces/task.model';

@Component({
  selector: 'app-task-edit-dialog',
  templateUrl: './task-edit-dialog.component.html',
  styleUrls: ['./task-edit-dialog.component.css'],
})
export class TaskEditDialogComponent implements OnInit {
  editTaskForm!: FormGroup;
  todaysDate!: Date;
  submittedDate!: Timestamp;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {}

  ngOnInit(): void {
    this.todaysDate = new Date();
    this.editTaskForm = this.fb.group({
      taskDetail: [this.data.detail],
      taskDescription: [this.data.description],
      taskSchedule: [this.data.scheduled.toDate()],
    });
  }
  // will return undefined to the onEditTask
  onCancel() {
    console.log('Cancel is working');
    this.dialogRef.close();
  }
  //will return an updated task object to onEditTask
  onEditSave() {
    this.submittedDate = this.editTaskForm.value.taskSchedule;
    this.data.detail = this.editTaskForm.value.taskDetail;
    this.data.description = this.editTaskForm.value.taskDescription;
    this.data.scheduled = this.submittedDate;
    this.dialogRef.close(this.data);
  }
}
