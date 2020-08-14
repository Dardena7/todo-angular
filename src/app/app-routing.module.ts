import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TasksDoneComponent } from './tasks-done/tasks-done.component';


const routes: Routes = [
  {path:"todo", component: TasksComponent},
  {path:"task/:id", component: TaskDetailComponent},
  {path:"done", component: TasksDoneComponent},
  {path:"**", redirectTo: 'todo'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
