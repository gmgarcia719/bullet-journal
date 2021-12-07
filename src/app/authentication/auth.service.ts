import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TaskService } from '../shared/services/task.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //since strictnull is turn on this is how i can set it up to be null if i need it to

  private isAuth: boolean = false;
  //we are using the subject observable to monitor signed in and signed out
  authChange = new Subject<boolean>();
  constructor(
    private router: Router,
    private dbAuth: AngularFireAuth,
    private taskService: TaskService
  ) {}

  AuthenticationListener() {
    this.dbAuth.authState.subscribe((user) => {
      if (user) {
        this.authChange.next(true);
        this.router.navigate(['/taskList']);
        this.isAuth = true;
      } else {
        this.taskService.cancelSubscription();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuth = false;
      }
    });
  }
  registerUser(authData: AuthData) {
    this.dbAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {})
      .catch((error) => {
        console.log(error);
      });
  }

  login(authData: AuthData) {
    this.dbAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {})
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    this.dbAuth.signOut();
  }
  getAuth() {
    return this.isAuth;
  }
}
