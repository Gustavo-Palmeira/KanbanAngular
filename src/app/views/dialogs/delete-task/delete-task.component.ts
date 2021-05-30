import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteTaskVo } from './delete-task-vo';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss']
})
export class DeleteTaskComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: DeleteTaskVo) { }

  name = this.data.name;

  ngOnInit(): void {
  }

  onConfirm(): void {
    this.data.confirm = true;
    this.dialogRef.close(this.data);
  }

  onCancel(): void {
    this.data.confirm = false;
    this.dialogRef.close(this.data);
  }

}
