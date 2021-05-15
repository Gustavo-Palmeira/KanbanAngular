import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  todo = [
    'Projeto e-commerce - Laravel',
    'Projeto Kanban - Angular',
    'Projeto POO - PHP',
    'Estudar Node.js',
    'Estudar React Native'
  ];

  done = [
    'Estudar React'
  ];

  constructor() { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  drop(event: CdkDragDrop<string[]>) {
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
