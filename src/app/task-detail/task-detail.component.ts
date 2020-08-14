import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../model/task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  errors: string[] = null;
  success: string = null;
  task: Task;
  taskEdit: Task;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.taskService.getTask(params['id']).subscribe(
          task => {
            if (!task){
              this.router.navigate(['/']);
            }
            else {
              this.setTask(task);
            }
          }
        );
      }
    );

  }

  private setTask(task: Task) {
    this.task = task;
    this.taskEdit = new Task(task._id,task.name,task.description,task.isDone);
  }

  onSubmit(form: NgForm)
  {

    this.taskEdit.isDone = form.value.status === 'true';
    
    this.taskService.updateTask(this.taskEdit).subscribe(
      response => {
        this.showSuccess();
        this.taskService.getTask(this.task._id).subscribe(
          task => {
            if (!task){
              this.router.navigate(['/']);
            }
            else {
              this.setTask(task);
              this.errors = null;
            }
          }
        );
      },
      errors => {
        this.errors = errors;
      }
    );

  }

  private showSuccess()
  {
    this.success = "Task edited with success !";
    setTimeout(()=> {
      this.success = null;
    }, 1000);
  }

  onBack()
  {
    this.router.navigate(['/']);
  }

  onDelete()
  {
    if(confirm('Are you sure you want to delete this task ?')) {
      this.taskService.deleteTask(this.task._id).subscribe(
        () => {this.router.navigate(['/']);}
      );
    }
  }

}
