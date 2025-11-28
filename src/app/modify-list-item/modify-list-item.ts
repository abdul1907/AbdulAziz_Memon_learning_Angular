import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { TideNode } from '../Models/tidenode.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TideNodeService } from '../services/tide-node-service';
import { CommonModule } from '@angular/common';
import { HighlightOnFocus } from '../directives/highlight-on-focus';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-modify-list-item',
  imports: [ReactiveFormsModule, CommonModule, HighlightOnFocus, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './modify-list-item.html',
  styleUrl: './modify-list-item.css'
})
export class ModifyListItem  implements OnInit {
  taskForm: FormGroup;
  task: TideNode | undefined;
  errorMessage: string | null = null;
  //Form Setup
  constructor(
    private fb: FormBuilder, //FormBuilder is a service that helps to create reactive forms
    private route: ActivatedRoute, //ActivatedRoute is a service helps read id parameter from the current Url 
    private router: Router, //Router is a service helps navigate between routes
    private tideNodeService: TideNodeService //TideNodeService is a service helps to manage CRUD operations for tide nodes
  ) {
    this.taskForm = this.fb.group({
      id:[''],
      taskDescription: ['', Validators.required],
      taskPriority: ['medium', Validators.required],
      taskDueDate: ['', Validators.required],
      taskEffort: ['1', [Validators.required, Validators.min(1), Validators.max(10)]],
      taskShiftReason: [''],
      currentTideLevel: [null],
      createdAt: [''],
      updatedAt: [''],
      status: ['active', Validators.required],
      category: ['', Validators.required],
      tags: [''],
      isHighTide: [false],
      isLowTide: [false],
      taskImage: [''],
    });
  }
// snapshot is a method that returns the current state of the route, 
// paramMap is a method that returns the parameters of the current route
//patchValue is a method that updates the form with the values of the task it is flexible and partial updates are allowed
  ngOnInit(): void {
    this.errorMessage = null;
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.tideNodeService.getTideNodeById(+id).subscribe({
      next: (task) => {
      if (task) {
        this.taskForm.patchValue(task);
      }else {
        this.errorMessage = 'Task not found';
      }
    },
    error: (error) => {
      this.errorMessage = 'Failed to fetch task';
      console.error('Error fetching task:', error);
    }
  });
  }
}

  onSubmit(): void {
  if (this.taskForm.valid) {
    this.errorMessage = null;
    const task: TideNode = this.taskForm.value;
    if (task.id) {
      this.tideNodeService.updateTideNode(task).subscribe({
        next: () => {
          this.router.navigate(['/task-list']);
        },
        error: (error) => {
          this.errorMessage = 'Failed to update task';
          console.error('Error updating task:', error);
        }
      });
    } else {
      this.tideNodeService.addTideNode(task).subscribe({
        next: () => {
          this.router.navigate(['/task-list']);
        },
        error: (error) => {
          this.errorMessage = 'Failed to add task';
          console.error('Error adding task:', error);
        }
      });
    }
  }
}

  // Reset button method - manually reset the form
  onReset(): void {
    this.taskForm.reset();
    // Reset to default values after resetting
    this.taskForm.patchValue({
      taskPriority: 'medium',
      taskEffort: '1',
      status: 'active',
      isHighTide: false,
      isLowTide: false
    });
  }

  onDelete(): void {
    this.errorMessage = null;
    const id = this.taskForm.value.id;
    if (id) {
      this.tideNodeService.deleteTideNode(id).subscribe({
        next: () => {
          this.router.navigate(['/task-list']);
        },
        error: (error) => {
          this.errorMessage = 'Failed to delete task';
          console.error('Error deleting task:', error);
        }
      });
    }
  }
}

