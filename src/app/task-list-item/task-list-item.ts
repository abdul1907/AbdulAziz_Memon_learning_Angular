import { Component, Input } from '@angular/core';
import { TideNode } from '../Models/tidenode.interface';


@Component({
  selector: 'app-task-list-item',
  standalone: true,
  imports: [],
  templateUrl: './task-list-item.html',
  styleUrl: './task-list-item.css'
})
export class TaskListItem {
  @Input() task!: TideNode;
}
