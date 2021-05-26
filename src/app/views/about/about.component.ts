import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  todo = [
    'Aprender Kanban',
    'Cadastrar tarefa',
    'Editar tarefa',
    'Excluir tarefa',
    'Listar tarefas',
    'Definir Tag',
  ];

  done = [];

  constructor() { }

  ngOnInit(): void {
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

}
