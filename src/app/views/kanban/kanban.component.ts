import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from 'src/app/services/task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from 'src/app/models/task';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../dialogs/create-task/create-task.component';
import { CreateTaskVo } from '../dialogs/create-task/create-task-vo';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {

  backlog = new Array<Task>();
  todo  = new Array<Task>();
  inProgress = new Array<Task>();
  review = new Array<Task>();
  done = new Array<Task>();

  editMode = false;
  createMode = false;

  constructor(private taskService: TaskService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.list();
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, '', { duration: 3000 });
  }

  // tslint:disable-next-line: typedef
  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  list(): void {
    this.taskService.list().subscribe(
      tasks => {
        this.backlog = tasks.filter(task => task.status === 'backlog');
        this.todo = tasks.filter(task => task.status === 'todo');
        this.inProgress = tasks.filter(task => task.status === 'inProgress');
        this.review = tasks.filter(task => task.status === 'review');
        this.done = tasks.filter(task => task.status === 'done');
      },
      error => {
        this.handleServiceError(error);
      }
    );
  }

  confirmCreation(): void {
    this.createMode = !this.createMode;
    const result = this.dialog.open(CreateTaskComponent, {
      width: '700px',
      data: {
        name: '',
        category: '',
        status: '',
      },
    });

    result.afterClosed().subscribe(
      (createTaskVo: CreateTaskVo) => {
        if (createTaskVo.name && createTaskVo.category && createTaskVo.status) {
          this.create(createTaskVo);
        }
      }
    );
  }

  create(task: CreateTaskVo): void {
    this.taskService.create(task).subscribe(
      () => {
        this.showSnackBar('Usuário inserido');
        this.list();
      },
      error => {
        this.handleServiceError(error);
      });
  }

  handleServiceError(error: HttpErrorResponse): void {
    const fail = error as HttpErrorResponse;
    this.showSnackBar(fail.message);
  }

}
