import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from 'src/app/services/task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from 'src/app/models/task';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../dialogs/create-task/create-task.component';
import { CreateTaskVo } from '../dialogs/create-task/create-task-vo';
import { DeleteTaskVo } from '../dialogs/delete-task/delete-task-vo';
import { DeleteTaskComponent } from '../dialogs/delete-task/delete-task.component';

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

  manipulateMode = false;
  removable = false;
  mouseSelected?: Task;

  constructor(private taskService: TaskService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.list();
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, '', { duration: 3000 });
  }

  // tslint:disable-next-line: typedef
  drop(event: CdkDragDrop<any>, title: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    event.container.data[event.currentIndex].status = title;
    this.update(event.container.data[event.currentIndex], 'drop');
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

  create(task: CreateTaskVo): void {
    this.taskService.create(task).subscribe(
      () => {
        this.showSnackBar('Tarefa inserida');
        this.list();
      },
      error => {
        this.handleServiceError(error);
      });
  }

  update(task: CreateTaskVo, drop: string): void {
    this.taskService.update(task).subscribe(
      () => {
        if (drop !== 'drop') {
          this.showSnackBar('Tarefa editada');
          this.list();
        }
      },
      error => {
        this.handleServiceError(error);
      });
  }

  remove(id?: number): void {
    if (id) {
      this.taskService.remove(id).subscribe(() => {
        this.list();
        this.showSnackBar('Task removida com sucesso!');
      },
      error => {
        this.handleServiceError(error);
      });
    }
  }

  tagRemove(task: CreateTaskVo): void {
    task.category = '';
    this.update(task, 'drop');
  }

  revealRemove(task: CreateTaskVo): void {
    this.mouseSelected = task;
    this.removable = true;
  }

  hideRemove(): void {
    this.removable = false;
  }

  confirmCreation(): void {
    this.manipulateMode = !this.manipulateMode;
    const result = this.dialog.open(CreateTaskComponent, {
      width: '700px',
      data: {
        name: '',
        description: '',
        category: '',
        status: '',
      },
    });

    result.afterClosed().subscribe(
      (createTaskVo: CreateTaskVo) => {
        if (createTaskVo.name && createTaskVo.status) {
          this.create(createTaskVo);
        }
      }
    );
  }

  confirmUpdate(task: Task): void {
    this.manipulateMode = !this.manipulateMode;
    const result = this.dialog.open(CreateTaskComponent, {
      width: '700px',
      data: {
        id: task.id,
        name: task.name,
        category: task.category,
        status: task.status
      },
    });

    result.afterClosed().subscribe(
      (updateTaskVo: CreateTaskVo) => {
        if (updateTaskVo.name && updateTaskVo.category && updateTaskVo.status) {
          this.update(updateTaskVo, 'edit');
        }
      }
    );
  }

  confirmDeletion(task: Task): void {
    const result = this.dialog.open(DeleteTaskComponent, {
      width: '700px',
      data: {
        confirm: false,
        id: task.id,
        name: task.name,
      },
    });

    result.afterClosed().subscribe((deleteTaskVo: DeleteTaskVo) => {
      if (!deleteTaskVo.confirm) {
        return;
      } else {
        this.remove(deleteTaskVo.id);
      }
    });
  }

  handleServiceError(error: HttpErrorResponse): void {
    const fail = error as HttpErrorResponse;
    this.showSnackBar(fail.message);
  }
}
