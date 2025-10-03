import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TideNode } from '../Models/tidenode.interface';


@Component({
  selector: 'app-task-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list-item.html',
  styleUrl: './task-list-item.css'
})
export class TaskListItem {
  @Input() task!: TideNode;
}
