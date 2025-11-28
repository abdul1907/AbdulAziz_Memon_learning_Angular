import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TideNode } from '../Models/tidenode.interface';
import { NgOptimizedImage } from '@angular/common';
import { TaskDescriptionPipe } from '../pipes/task-description-pipe';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';


@Component({
  selector: 'app-task-list-item',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, TaskDescriptionPipe, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './task-list-item.html',
  styleUrl: './task-list-item.css'
})
export class TaskListItem {
  @Input() task?: TideNode;
}
