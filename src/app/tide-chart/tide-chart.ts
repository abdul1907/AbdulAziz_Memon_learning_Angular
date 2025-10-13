// Import statements: Bring in required Angular modules and interfaces
// import: ES6 module syntax for importing code from other files

// Component, OnInit, Input, Output, EventEmitter: Angular decorators and interfaces
// Component: Decorator that marks a class as an Angular component
// OnInit: Interface that defines a lifecycle hook method (ngOnInit)
// Input: Decorator for properties that receive data from parent components
// Output: Decorator for properties that emit events to parent components
// EventEmitter: Class for creating custom events
// '@angular/core': Angular core module containing fundamental Angular features
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// CommonModule: Angular module that provides common directives like *ngFor, *ngIf
// '@angular/common': Angular common module with shared functionality
import { CommonModule } from '@angular/common';

// TideNode: Interface defining the structure of a task
// '../Models/tidenode.interface': Relative path to the interface file
import { TideNode } from '../Models/tidenode.interface';

// TideNodeService: Service class for managing tide node operations
// '../services/tide-node-service': Relative path to the service file
import { TideNodeService } from '../services/tide-node-service';

// Component decorator: Defines this class as an Angular component
// @Component: Angular decorator function that adds metadata to the class
// selector: 'app-tide-chart': How this component is used in HTML templates (<app-tide-chart>)
// standalone: true: This component can be imported independently without being declared in a module
// imports: [CommonModule]: Imports Angular common directives like *ngFor, *ngIf, @for, @if
// templateUrl: './tide-chart.html': Path to the HTML template file
// styleUrl: './tide-chart.css': Path to the CSS styles file
@Component({
  selector: 'app-tide-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tide-chart.html',
  styleUrl: './tide-chart.css'
})
// TideChartComponent: Class that creates a visual tide chart for displaying tasks
// export: Makes this class available for import in other files
// implements OnInit: This class implements the OnInit interface, requiring ngOnInit() method
// class: ES6 keyword for creating a class (blueprint for objects)
export class TideChartComponent implements OnInit {
  // Input decorator allows parent components to pass data to this component
  // Optional input - if not provided, component will fetch its own data
  @Input() tideNodes: TideNode[] = [];

  // Output decorator allows this component to emit events to parent components
  // EventEmitter<TideNode> - emits TideNode objects when a task is clicked
  @Output() taskClicked = new EventEmitter<TideNode>();

  // Local properties for managing tide chart data
  // highTideTasks: TideNode[] - stores tasks that are currently in high tide (urgent)
  highTideTasks: TideNode[] = [];

  // lowTideTasks: TideNode[] - stores tasks that are currently in low tide (can be deferred)
  lowTideTasks: TideNode[] = [];

  // mediumTideTasks: TideNode[] - stores tasks that are in medium tide (normal priority)
  mediumTideTasks: TideNode[] = [];

  // showHighTide: boolean - controls whether high tide section is visible
  showHighTide: boolean = true;

  // showMediumTide: boolean - controls whether medium tide section is visible
  showMediumTide: boolean = true;

  // showLowTide: boolean - controls whether low tide section is visible
  showLowTide: boolean = true;

  // Constructor with dependency injection
  // private tideNodeService: TideNodeService - injects the service for data operations
  constructor(private tideNodeService: TideNodeService) {}

  // ngOnInit lifecycle hook - called after component initialization
  // This is where we set up initial data and subscriptions
  ngOnInit(): void {
    // If no tide nodes were passed as input, fetch them from the service
    if (this.tideNodes.length === 0) {
      this.loadTideNodes();
    } else {
      // If tide nodes were provided, categorize them immediately
      this.categorizeTideNodes();
    }
  }

  // Method to load tide nodes from the service
  // Uses Observable subscription to get data reactively
  private loadTideNodes(): void {
    // Subscribe to the service's getAllTideNodes method
    this.tideNodeService.getAllTideNodes().subscribe({
      // next: callback executed when data is received successfully
      next: (tideNodes: TideNode[]) => {
        // Store the received tide nodes
        this.tideNodes = tideNodes;
        // Categorize them into high, medium, and low tide
        this.categorizeTideNodes();
      },
      // error: callback executed if there's an error
      error: (error) => {
        console.error('Error loading tide nodes:', error);
      }
    });
  }

  // Method to categorize tide nodes based on their tide levels
  // This creates the visual "tide" effect by grouping tasks
  private categorizeTideNodes(): void {
    // Filter tasks based on their tide level flags
    // High tide tasks: urgent, need immediate attention
    this.highTideTasks = this.tideNodes.filter(tideNode => 
      tideNode.isHighTide && tideNode.status === 'active'
    );

    // Low tide tasks: can be deferred, not urgent
    this.lowTideTasks = this.tideNodes.filter(tideNode => 
      tideNode.isLowTide && tideNode.status === 'active'
    );

    // Medium tide tasks: normal priority, neither urgent nor deferrable
    this.mediumTideTasks = this.tideNodes.filter(tideNode => 
      !tideNode.isHighTide && !tideNode.isLowTide && tideNode.status === 'active'
    );
  }

  // Method to handle task clicks in the tide chart
  // Emits the clicked task to parent components
  onTaskClick(tideNode: TideNode): void {
    // Emit the clicked tide node to parent components
    this.taskClicked.emit(tideNode);
  }

  // Method to refresh tide levels for all tasks
  // This simulates the "tide flow" - tasks can rise and fall
  refreshTideLevels(): void {
    // Call service method to recalculate all tide levels
    this.tideNodeService.updateAllTideLevels().subscribe({
      next: (updatedTideNodes: TideNode[]) => {
        // Update local tide nodes with recalculated data
        this.tideNodes = updatedTideNodes;
        // Re-categorize tasks with new tide levels
        this.categorizeTideNodes();
      },
      error: (error) => {
        console.error('Error refreshing tide levels:', error);
      }
    });
  }

  // Method to toggle visibility of high tide section
  // Allows users to show/hide urgent tasks
  toggleHighTide(): void {
    this.showHighTide = !this.showHighTide;
  }

  // Method to toggle visibility of medium tide section
  // Allows users to show/hide normal priority tasks
  toggleMediumTide(): void {
    this.showMediumTide = !this.showMediumTide;
  }

  // Method to toggle visibility of low tide section
  // Allows users to show/hide deferrable tasks
  toggleLowTide(): void {
    this.showLowTide = !this.showLowTide;
  }

  // Method to get the CSS class for tide level styling
  // Returns different classes based on tide level for visual differentiation
  getTideLevelClass(tideLevel: number): string {
    if (tideLevel >= 70) {
      return 'high-tide'; // High tide styling (red/orange colors)
    } else if (tideLevel >= 40) {
      return 'medium-tide'; // Medium tide styling (yellow colors)
    } else {
      return 'low-tide'; // Low tide styling (blue colors)
    }
  }

  // Method to get the tide level description
  // Returns human-readable description of tide level
  getTideLevelDescription(tideLevel: number): string {
    if (tideLevel >= 70) {
      return 'High Tide - Urgent Focus';
    } else if (tideLevel >= 40) {
      return 'Medium Tide - Normal Priority';
    } else {
      return 'Low Tide - Can Defer';
    }
  }

  // Method to get the total count of tasks in each tide level
  // Useful for displaying statistics
  getTotalTasksCount(): number {
    return this.tideNodes.filter(tideNode => tideNode.status === 'active').length;
  }

  // Method to get the count of high tide tasks
  getHighTideCount(): number {
    return this.highTideTasks.length;
  }

  // Method to get the count of medium tide tasks
  getMediumTideCount(): number {
    return this.mediumTideTasks.length;
  }

  // Method to get the count of low tide tasks
  getLowTideCount(): number {
    return this.lowTideTasks.length;
  }
}
