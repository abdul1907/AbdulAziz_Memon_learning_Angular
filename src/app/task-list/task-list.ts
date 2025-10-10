import { Component, EventEmitter, OnInit, Output  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TideNode } from '../Models/tidenode.interface';
import { TaskListItem } from "../task-list-item/task-list-item";
import { TideNodeService } from '../services/tide-node-service';

@Component({
  selector: 'app-task-list',
  imports: [TaskListItem, CommonModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList implements OnInit {
  title = 'abdul-aziz-memon-learning-angular';
  tideNodes: TideNode[] = [];

  @Output() taskSelected = new EventEmitter<TideNode>();

  constructor(private tideNodeService: TideNodeService) { }
  
  ngOnInit(): void {
    this.tideNodeService.getAllTideNodes().subscribe((tideNodes: TideNode[]) => {
      this.tideNodes = tideNodes;
      }
    );
  }

  // Click Handling Method 
  onTaskClick(tideNode: TideNode): void {
    this.taskSelected.emit(tideNode);
  }
}