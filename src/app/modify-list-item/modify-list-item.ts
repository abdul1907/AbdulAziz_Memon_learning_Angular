import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { TideNode } from '../Models/tidenode.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TideNodeService } from '../services/tide-node-service';

@Component({
  selector: 'app-modify-list-item',
  imports: [ReactiveFormsModule],
  templateUrl: './modify-list-item.html',
  styleUrl: './modify-list-item.css'
})
export class ModifyListItem  implements OnInit {
  taskForm: FormGroup;
  task: TideNode | undefined;
  //Form Setup
  constructor(
    private fb: FormBuilder, //FormBuilder is a service that helps to create reactive forms
    private route: ActivatedRoute, //ActivatedRoute is a service helps read id parameter from the current Url 
    private router: Router, //Router is a service helps navigate between routes
    private tideNodeService: TideNodeService //TideNodeService is a service helps to manage CRUD operations for tide nodes
  ) {
    this.taskForm = this.fb.group({
      taskId:['', Validators.required],
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
  const taskId = this.route.snapshot.paramMap.get('id');
  if (taskId) {
    this.tideNodeService.getTideNodeById(+taskId).subscribe(task => {
      if (task) {
        this.task = task;
        this.taskForm.patchValue(task);
      }
    });
  }
}

  onSubmit(): void {
    const task : TideNode = this.taskForm.value;
    if (task.taskId) {
      this.tideNodeService.updateTideNode(task);
    }
    else {
      const newTaskId = this.tideNodeService.generateNewTaskId();
      task.taskId = newTaskId;
      this.tideNodeService.addTideNode(task);
    }
    // Reset form after submission
    this.taskForm.reset();
    // Reset form to default values
    this.taskForm.patchValue({
      taskPriority: 'medium',
      taskEffort: '1',
      status: 'active',
      isHighTide: false,
      isLowTide: false
    });
    // Navigate to task list
    this.router.navigate(['/task-list']);
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

}
