import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/interfaces/task.model';
import { TaskService } from 'src/app/shared/services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskEditDialogComponent } from './task-edit/task-edit-dialog/task-edit-dialog.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  @Input() taskItem!: Task;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {}
}
