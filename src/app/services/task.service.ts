import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  list(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.apiUrl}/tasks`);
  }

  create(task?: Task): Observable<Task> {
    if (!task) { return EMPTY; }
    return this.http.post<Task>(`${environment.apiUrl}/tasks`, task);
  }

  update(task?: Task): Observable<Task> {
    if (!task) { return EMPTY; }
    return this.http.put<Task>(`${environment.apiUrl}/tasks/${task.id}`, task);
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/tasks/${id}`);
  }
}
