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
  errorMessage :string | null = null;
   

  constructor(private tideNodeService: TideNodeService,
      private router: Router) { }
  
  ngOnInit(): void {
    this.tideNodeService.getAllTideNodes().subscribe({
      next: (tideNodes: TideNode[]) => {
        this.tideNodes = tideNodes;
        this.errorMessage = null;
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch tide nodes';
        console.error('Error loading tide nodes:', error);
      }
    });
  }
    
  onDelete(tideNode: TideNode): void {
    this.errorMessage = null;
    this.tideNodeService.deleteTideNode(tideNode.id).subscribe(() => {
      this.tideNodeService.getAllTideNodes().subscribe(
        (tideNodes: TideNode[]) => {
          this.tideNodes = tideNodes;
        },
        (error) => {
          this.errorMessage = 'Failed to Refresh the list after task delete'
          console.error('Error refreshing list after task delete:', error);
        }
      );
    },
    (error) => {
      this.errorMessage = 'Failed to delete task'
      console.error('Error deleting task:', error);
    }
  );
}

  onEdit(tideNode: TideNode): void {
    this.router.navigate(['/modify-list-item', tideNode.id]);
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