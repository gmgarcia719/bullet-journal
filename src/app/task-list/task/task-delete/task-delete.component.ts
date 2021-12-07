import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/interfaces/task.model';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-task-delete',
  templateUrl: './task-delete.component.html',
  styleUrls: ['./task-delete.component.css'],
})
export class TaskDeleteComponent implements OnInit {
  @Input() selectedTask!: Task;
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {}
  onDeleteTask() {
    this.taskService.deleteTask(this.selectedTask.id);
  }
}
