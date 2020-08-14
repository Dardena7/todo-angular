import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../services/task.service'
import { Task } from '../model/task.model';
import { Subscription, Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks-done',
  templateUrl: './tasks-done.component.html',
  styleUrls: ['./tasks-done.component.css']
})
export class TasksDoneComponent implements OnInit, OnDestroy {

  tasks: Task[];
  tasksSub: Subscription;

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

  onSelectTask(id: string)
  {
    this.router.navigate(['task',id]);
  }

}

