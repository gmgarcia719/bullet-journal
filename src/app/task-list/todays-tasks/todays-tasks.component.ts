import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/shared/interfaces/task.model';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-todays-tasks',
  templateUrl: './todays-tasks.component.html',
  styleUrls: ['./todays-tasks.component.css'],
})
export class TodaysTasksComponent implements OnInit, OnDestroy {
  tasksSubscription: Subscription = new Subscription();
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasksSubscription = this.taskService.tasksChange.subscribe(
      (fetchedTasks: Task[]) => {
        this.tasks = fetchedTasks;
      }
    );
    this.taskService.fetchTasks();
  }

  onTaskClick(id: string, completedState: boolean) {
    this.taskService.updateCompleted(id, completedState);
  }
  overdueTask(task: Task) {
    return this.taskService.checkOverdue(task);
  }
  ngOnDestroy() {
    this.tasksSubscription.unsubscribe();
  }
}
