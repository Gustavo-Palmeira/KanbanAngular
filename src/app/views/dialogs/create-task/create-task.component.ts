import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateTaskVo } from './create-task-vo';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: CreateTaskVo) { }

  name = this.data.name;
  description = this.data.description;
  category = this.data.category;
  status = this.data.status;
  background = this.data.background;
  fontColor = this.data.fontColor;
  tagColor = this.data.tagColor;
  selectedValue = this.data.status;

  statusSelect = [
    {value: 'backlog', viewValue: 'Backlog'},
    {value: 'todo', viewValue: 'To do'},
    {value: 'inProgress', viewValue: 'In Progress'},
    {value: 'review', viewValue: 'Review'},
    {value: 'done', viewValue: 'Done'},
  ];

  ngOnInit(): void {
    console.log(this.background);
  }

  cancel(): void {
    this.dialogRef.close(this.data);
  }

  createTask(): void {
    this.data.name = this.name;
    this.data.description = this.description;
    this.data.category = this.category;
    this.data.status = this.selectedValue;
    this.data.background = this.background;
    this.data.fontColor = this.fontColor;
    this.data.tagColor = this.tagColor;
    if (this.data.name !== '' && this.data.status !== '') {
      this.dialogRef.close(this.data);
    }
  }

}
