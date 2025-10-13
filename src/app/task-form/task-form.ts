import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TideNode } from '../Models/tidenode.interface';
import { TideNodeService } from '../services/tide-node-service';

// This component handles creating new tasks
@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule], // FormsModule needed for ngModel
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm {
  // Event to notify parent when a new task is created
  @Output() taskCreated = new EventEmitter<TideNode>();

  // Form fields - these bind to the input fields in the template
  taskDescription: string = '';
  taskPriority: 'low' | 'medium' | 'high' = 'medium';
  taskDueDate: string = '';
  taskEffort: number = 1;
  taskCategory: string = '';
  taskTags: string = ''; // comma-separated tags
  taskShiftReason: string = '';

  // Track if form is being shown or hidden
  showForm: boolean = false;

  // Inject the service to add tasks
  constructor(private tideNodeService: TideNodeService) {}

  // Toggle form visibility
  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  // Handle form submission
  onSubmit(): void {
    // Basic validation
    if (!this.taskDescription.trim()) {
      alert('Please enter a task description');
      return;
    }

    if (!this.taskDueDate) {
      alert('Please select a due date');
      return;
    }

    if (!this.taskCategory.trim()) {
      alert('Please enter a category');
      return;
    }

    // Generate a new task ID (in real app, backend would do this)
    const newId = Date.now();

    // Split tags by comma and clean them up
    const tagsArray = this.taskTags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    // Create the new task object
    const newTask: TideNode = {
      taskId: newId,
      taskDescription: this.taskDescription,
      taskPriority: this.taskPriority,
      taskDueDate: this.taskDueDate,
      taskEffort: this.taskEffort,
      taskShiftReason: this.taskShiftReason || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active',
      category: this.taskCategory,
      tags: tagsArray,
      isHighTide: false, // will be calculated by service
      isLowTide: false
    };

    // Calculate the tide level for the new task
    const tideLevel = this.tideNodeService.calculateTideLevel(newTask);
    newTask.currentTideLevel = tideLevel;
    newTask.isHighTide = tideLevel >= 70;
    newTask.isLowTide = tideLevel <= 30;

    // Add task to service
    this.tideNodeService.addTideNode(newTask).subscribe(() => {
      // Notify parent component
      this.taskCreated.emit(newTask);
      
      // Reset form and hide it
      this.resetForm();
      this.showForm = false;
      
      alert('Task created successfully!');
    });
  }

  // Reset all form fields
  resetForm(): void {
    this.taskDescription = '';
    this.taskPriority = 'medium';
    this.taskDueDate = '';
    this.taskEffort = 1;
    this.taskCategory = '';
    this.taskTags = '';
    this.taskShiftReason = '';
  }
}
