import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TideNode } from '../Models/tidenode.interface';
import { TaskListItem } from "../task-list-item/task-list-item";
import { TideNodeService } from '../services/tide-node-service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-task-list',
  imports: [TaskListItem, CommonModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList implements OnInit {
  title = 'abdul-aziz-memon-learning-angular';
  tideNodes: TideNode[] = [];

  @Output() taskSelected = new EventEmitter<TideNode>(); //Event Emitter is used to emit custom events from child to parent component, here it emits a TideNode object when a task is selected, @output makes the property available for event binding by parent components
  
   

  constructor(private tideNodeService: TideNodeService,
      private router: Router) { }
  
  ngOnInit(): void {
    this.tideNodeService.getAllTideNodes().subscribe((tideNodes: TideNode[]) => {
      this.tideNodes = tideNodes;
      }
    );
  }

  onDelete(tideNode: TideNode): void {
    this.tideNodeService.deleteTideNode(tideNode.taskId).subscribe(() => {
      this.tideNodeService.getAllTideNodes().subscribe((tideNodes: TideNode[]) => {
        this.tideNodes = tideNodes;
      });
    });
  }

  onEdit(tideNode: TideNode): void {
    this.router.navigate(['/modify-list-item', tideNode.taskId]);
  }
  
  // Add Button Handling Method - navigates to empty form for creating new task
  onAdd(): void {
    this.router.navigate(['/modify-list-item']);
  }
  // Click Handling Method 
  onTaskClick(tideNode: TideNode): void {
    this.taskSelected.emit(tideNode);
  }
}