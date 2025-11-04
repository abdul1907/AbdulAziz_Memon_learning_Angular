// Import statements: Bring in required Angular modules, interfaces, and components
// import: ES6 module syntax for importing code from other files

// Component, OnInit: Angular decorators and interfaces
// Component: Decorator that marks a class as an Angular component
// OnInit: Interface that defines a lifecycle hook method (ngOnInit)
// '@angular/core': Angular core module containing fundamental Angular features
import { Component, OnInit } from '@angular/core';

// CommonModule: Angular module that provides common directives like *ngFor, *ngIf
// '@angular/common': Angular common module with shared functionality
import { CommonModule } from '@angular/common';

// TideNode: Interface defining the structure of a task
// './Models/tidenode.interface': Relative path to the interface file
import { TideNode } from './Models/tidenode.interface';

// TaskList: Component class for displaying a list of tasks
// './task-list/task-list': Relative path to the TaskList component
import { TaskList } from './task-list/task-list';

// TideNodeService: Service class for managing tide node operations
// './services/tide-node-service': Relative path to the service file
import { TideNodeService } from './services/tide-node-service';

// TaskListItem: Component class for displaying individual task items
// './task-list-item/task-list-item': Relative path to the TaskListItem component
import { TaskListItem } from './task-list-item/task-list-item';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";


// TideChartComponent: Component class for displaying tasks in a visual tide chart
// './tide-chart/tide-chart': Relative path to the TideChartComponent
// Component decorator marks this as the root component
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [CommonModule, TaskList, TaskListItem, RouterOutlet, RouterLink, RouterLinkActive]
})
// AppComponent: Root component class that manages the entire application
// export: Makes this class available for import in other files
// implements OnInit: This class implements the OnInit interface, requiring ngOnInit() method
// class: ES6 keyword for creating a class (blueprint for objects)
export class AppComponent implements OnInit {
  // title: string - property to store the application title
  title = 'abdul-aziz-memon-learning-angular';

  // selectedTideNode: TideNode | undefined - stores the currently selected task
  // undefined initially, gets set when user clicks on a task
  selectedTideNode: TideNode | undefined;

  // allTideNodes: TideNode[] - stores all tasks from the service
  // Used to pass data to the tide chart component
  allTideNodes: TideNode[] = [];

  // Constructor with dependency injection
  // private tideNodeService: TideNodeService - injects the service for data operations
  constructor(private tideNodeService: TideNodeService) {}

  // ngOnInit lifecycle hook - called after component initialization
  // This is where we set up initial data and subscriptions
  ngOnInit(): void {
    // Load all tide nodes when the component initializes
    this.loadAllTideNodes();

    // Load the first tide node as the default selected task
    this.tideNodeService.getTideNodeById(1).subscribe(
      (tideNode: TideNode | undefined) => {
        this.selectedTideNode = tideNode;
      }
    );
  }

  // Method to load all tide nodes from the service
  // Uses Observable subscription to get data reactively
  private loadAllTideNodes(): void {
    // Subscribe to the service's getAllTideNodes method
    this.tideNodeService.getAllTideNodes().subscribe({
      // next: callback executed when data is received successfully
      next: (tideNodes: TideNode[]) => {
        // Store the received tide nodes
        this.allTideNodes = tideNodes;
      },
      // error: callback executed if there's an error
      error: (error) => {
        console.error('Error loading tide nodes:', error);
      }
    });
  }

  // Method to handle task selection from the task list
  // Called when user clicks on a task in the task list component
  // tideNode: TideNode - the task that was clicked
  onTaskSelected(tideNode: TideNode): void {
    // Set the selected tide node to the clicked task
    this.selectedTideNode = tideNode;
  }

  // Method to handle task selection from the tide chart
  // Called when user clicks on a task in the tide chart component
  // tideNode: TideNode - the task that was clicked
  onTideChartTaskClicked(tideNode: TideNode): void {
    // Set the selected tide node to the clicked task
    this.selectedTideNode = tideNode;
  }

  // Method to refresh all tide levels
  onTideLevelsRefreshed(): void {
    this.loadAllTideNodes();
  }

  // Handle new task creation from the form
  onTaskCreated(newTask: TideNode): void {
    // Reload all tasks to include the new one
    this.loadAllTideNodes();

    // Select the newly created task
    this.selectedTideNode = newTask;
  }
}
