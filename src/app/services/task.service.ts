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

  create(taks?: Task): Observable<Task> {
    if (!taks) { return EMPTY; }
    return this.http.post<Task>(`${environment.apiUrl}/tasks`, taks);
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/tasks/${id}`);
  }
}
