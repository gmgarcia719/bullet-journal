import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskBasic } from 'src/app/shared/interfaces/task-basic';
import { TaskService } from '../../shared/services/task.service';
import { TaskAddDialogComponent } from './task-add-dialog/task-add-dialog.component';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css'],
})
export class TaskAddComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  onAddTask() {
    const dialogRef = this.dialog.open(TaskAddDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: TaskBasic) => {
      if (result !== undefined) {
        this.taskService.addTask(result);
        this.cd.detectChanges();
      }
    });
  }
}
