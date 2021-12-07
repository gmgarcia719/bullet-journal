import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskBasic } from 'src/app/shared/interfaces/task-basic';
import { Task } from 'src/app/shared/interfaces/task.model';

@Component({
  selector: 'app-task-add-dialog',
  templateUrl: './task-add-dialog.component.html',
  styleUrls: ['./task-add-dialog.component.css'],
})
export class TaskAddDialogComponent implements OnInit {
  addTaskForm!: FormGroup;
  todaysDate!: Date;
  newTask!: TaskBasic;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskAddDialogComponent>
  ) {}

  ngOnInit(): void {
    this.todaysDate = new Date();
    this.addTaskForm = this.fb.group({
      taskDetail: ['', [Validators.required]],
      taskSchedule: [this.todaysDate],
      taskDescription: [''],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onNewTask() {
    this.newTask = {
      detail: this.addTaskForm.value.taskDetail,
      description: this.addTaskForm.value.taskDescription,
      scheduled: this.addTaskForm.value.taskSchedule,
      completed: false,
    };
    this.dialogRef.close(this.newTask);
  }
}
