import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../shared/interfaces/task.model';
import { TaskService } from '../shared/services/task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {}

  ngOnDestroy() {}
}
