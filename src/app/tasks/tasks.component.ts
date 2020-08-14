import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../services/task.service'
import { Task } from '../model/task.model';
import { Subscription, Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {

  tasks: Task[];
  tasksSub: Subscription;
  errors: string[] = null;

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.tasksSub = this.taskService.taskSubject.subscribe(tasks => {
      this.tasks = tasks.reverse();
    });
    this.taskService.getAllTasks();
  }

  ngOnDestroy() {
    this.tasksSub.unsubscribe();
  }

  onSubmit(form: NgForm)
  {
    if (!form.valid) {
      return;
    }
    this.taskService.addTask(new Task("", form.value.name, form.value.description, false)).subscribe(
      response => {
        this.taskService.getAllTasks();
        this.errors = null;
        form.reset();
      },
      errors => {
        this.errors = errors;
      }
    );
  }

  onSelectTask(id: string)
  {
    console.log(id);
    
    this.router.navigate(['task',id]);
  }

}
