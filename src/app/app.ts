import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TideNode } from './Models/tidenode.interface';
import { TaskList } from './task-list/task-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [CommonModule, TaskList]
})
export class AppComponent {
  title = 'abdul-aziz-memon-learning-angular';

  // tideNodes: TideNode[] = [

  //   //Instance 1
  //   {
  //     taskId: 1,
  //     taskDescription: 'Compelete Angular Test',
  //     taskPriority: 'high',
  //     taskDueDate: 'Jan 20, 2025',
  //     taskEffort: 3,
  //     taskShiftReason: 'Moved due to other priorities'
  //   },
  //   //Instance 2
  //   { 
  //     taskId: 2, 
  //     taskDescription: 'Study TypeScript basics', 
  //     taskPriority: 'medium', 
  //     taskDueDate: 'Jan 20, 2025', 
  //     taskEffort: 2 
  //   },
  //   // Instance 3
  //   { 
  //     taskId: 3, 
  //     taskDescription: 'Practice Angular components', 
  //     taskPriority: 'high', 
  //     taskDueDate: 'Jan 20, 2025', 
  //     taskEffort: 4, 
  //     taskShiftReason: 'Extended for better understanding' 
  //   },
  //   // Instance 4
  //   { 
  //     taskId: 4, 
  //     taskDescription: 'Review lecture notes', 
  //     taskPriority: 'low', 
  //     taskDueDate: 'Sep 25, 2025', 
  //     taskEffort: 1 
  //   },
  //   // Instance 5
  //   { 
  //     taskId: 5, 
  //     taskDescription: 'Prepare for exam', 
  //     taskPriority: 'high', 
  //     taskDueDate: 'Sep 25, 2025', 
  //     taskEffort: 5, 
  //     taskShiftReason: 'Prioritized over other tasks' 
  //   },
  //   // Instance 6
  //   { 
  //     taskId: 6, 
  //     taskDescription: 'Update project documentation', 
  //     taskPriority: 'medium', 
  //     taskDueDate: 'Sep 25, 2025', 
  //     taskEffort: 2 
  //   }
  // ];
}