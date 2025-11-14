import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TideNode } from '../Models/tidenode.interface';
import { NgOptimizedImage } from '@angular/common';
import { TaskDescriptionPipe } from '../pipes/task-description-pipe';


@Component({
  selector: 'app-task-list-item',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, TaskDescriptionPipe],
  templateUrl: './task-list-item.html',
  styleUrl: './task-list-item.css'
})
export class TaskListItem {
  @Input() task?: TideNode;
}
