import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './exports/material.module';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task-list/task/task.component';
import { TaskAddComponent } from './task-list/task-add/task-add.component';
import { TaskAddDialogComponent } from './task-list/task-add/task-add-dialog/task-add-dialog.component';
import { TaskEditComponent } from './task-list/task/task-edit/task-edit.component';
import { TaskEditDialogComponent } from './task-list/task/task-edit/task-edit-dialog/task-edit-dialog.component';
import { TaskDeleteComponent } from './task-list/task/task-delete/task-delete.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavListComponent } from './navigation/nav-list/nav-list.component';
import { ToolBarComponent } from './navigation/tool-bar/tool-bar.component';

import { environment } from '../environments/environment';
import { TodaysTasksComponent } from './task-list/todays-tasks/todays-tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskComponent,
    TaskAddComponent,
    TaskAddDialogComponent,
    TaskEditComponent,
    TaskEditDialogComponent,
    TaskDeleteComponent,
    SignupComponent,
    LoginComponent,
    WelcomeComponent,
    NavListComponent,
    ToolBarComponent,
    TodaysTasksComponent,
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
