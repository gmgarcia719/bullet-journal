import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/shared/interfaces/task.model';
import { TaskService } from 'src/app/shared/services/task.service';
import { TaskEditDialogComponent } from './task-edit-dialog/task-edit-dialog.component';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
})
export class TaskEditComponent implements OnInit {
  @Input() selectedTask!: Task;
  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  onEditTask() {
    const dialogRef = this.dialog.open(TaskEditDialogComponent, {
      width: '400px',
      data: this.selectedTask,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result !== undefined) {
        this.taskService.editTask(result);
      }
    });
  }
}
