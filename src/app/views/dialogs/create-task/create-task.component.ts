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

  name = '';
  category = '';
  status = '';

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close(this.data);
  }

  createTask(): void {
    this.data.name = this.name;
    this.data.category = this.category;
    this.data.status = this.status;
    if (this.data.name !== '' && this.data.category !== '' && this.data.status !== '') {
      this.dialogRef.close(this.data);
    }
  }

}
