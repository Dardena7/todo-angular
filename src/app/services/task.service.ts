import { Injectable } from "@angular/core";
import { Task } from "../model/task.model";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment'

@Injectable({providedIn: "root"})
export class TaskService {

    private tasks: Task[];
    taskSubject = new Subject<Task[]>();

    constructor(private httpClient: HttpClient) {}

    getAllTasks()
    {
        this.httpClient
            .get<any[]>('http://todospring-env.eba-meujtwnv.us-east-2.elasticbeanstalk.com/api/tasks')
            .pipe(
                map(tasks => {
                    return tasks.map(task => {
                        return new Task(
                                task._id,
                                task.name,
                                task.description,
                                task.done);
                    });
                })
            ).subscribe(tasks => {
                this.setTasks(tasks);
            });
    }

    getTask(id: string)
    {
        return this.httpClient
            .get<any>(environment.apiAddress+'/api/tasks/'+id)
                .pipe(
                    map(task => {
                        if (!task)
                            return null;
                        
                        return new Task(
                                task._id,
                                task.name,
                                task.description,
                                task.done);
                        })
                );
    }

    addTask(task: Task) {
        return this.httpClient.post<Task>(environment.apiAddress+'api/tasks', task)
            .pipe(
                catchError(this.handleErrors)
            );
    }

    updateTask(task: Task) {
        return this.httpClient.put<Task>(environment.apiAddress+'/api/tasks', task)
            .pipe(
                catchError(this.handleErrors)
            );
    }

    deleteTask(id: string)
    {
        return this.httpClient.delete(environment.apiAddress+'/api/tasks/'+id);
    }

    setTasks(tasks: Task[]) 
    {
        this.tasks = tasks;
        this.taskSubject.next(this.tasks.slice());
    }

    handleErrors(errorResponse: HttpErrorResponse)
    {
        let errorMessage = [];
        let errors = errorResponse.error;
        
        for (let key in errors) {
            if (errors.hasOwnProperty(key)) {
                for (let error of errors[key]) {
                    errorMessage.push(error);
                }
            }
        }
        return throwError(errorMessage);
    }
}