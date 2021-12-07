import { EventEmitter, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TaskBasic } from '../interfaces/task-basic';
import { Task } from '../interfaces/task.model';
import { map } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { DateInfo } from '../interfaces/date-info';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  taskUpDate = new EventEmitter<Task[]>();
  private tasks: Task[] = [];
  //had to initial tasksChange was getting an error the next was undefined
  tasksChange: Subject<Task[]> = new Subject<Task[]>();
  private fbSub: Subscription = new Subscription();

  constructor(private db: AngularFirestore) {}
  //returns a copy of the task list
  fetchTasks() {
    this.fbSub = this.db
      .collection('tasks')
      .snapshotChanges()
      .pipe(
        map((array) => {
          return array.map((doc) => {
            return {
              ...(doc.payload.doc.data() as Task),
              id: doc.payload.doc.id,
            };
          });
        })
      )
      .subscribe((fetched: Task[]) => {
        this.tasks = fetched;
        this.tasksChange.next([...this.tasks]);
      });
  }

  updateTaskList(tasks: Task[]) {
    this.taskUpDate.emit([...tasks]);
  }

  addTask(formEntry: TaskBasic) {
    this.db.collection('tasks').add({ ...formEntry });
  }

  deleteTask(id: string) {
    this.db.doc(`tasks/${id}`).delete();
  }

  editTask(editedTask: Task) {
    this.db.doc(`tasks/${editedTask.id}`).update({
      ...editedTask,
    });
  }

  cancelSubscription() {
    this.fbSub.unsubscribe();
  }
  //if a task was not completed on the date it was scheduled it will be updated to the current Date
  //not working as intended will revisit
  checkOverdue(task: Task) {
    const today: Date = new Date(this.todaysDateWithNoTime());
    const taskDueDate: Date = new Date(
      this.formatDate(task.scheduled.toDate())
    );
    if (taskDueDate < today && task.completed === false) {
      console.log('something is not completed');
      return true;
    } else {
      return false;
    }
  }

  updateCompleted(id: string, completedState: boolean) {
    this.db.doc(`tasks/${id}`).update({ completed: !completedState });
  }
  //creates an object that holds the month date and year of the date received
  dateBreakDown(date: Date) {
    return {
      month: date.getMonth(),
      date: date.getDate(),
      year: date.getFullYear(),
    };
  }
  //removes the time from the date
  formatDate(date: Date) {
    const dateInfo: DateInfo = this.dateBreakDown(date);
    return `${dateInfo.month}/${dateInfo.date}/${dateInfo.year}`;
  }
  //gets todays date with no time
  todaysDateWithNoTime() {
    return this.formatDate(new Date());
  }
  formatMonthYear(date: Date) {
    const mdy: DateInfo = this.dateBreakDown(date);
    return `${mdy.month}/${mdy.year}`;
  }
}
