import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TideNode } from './Models/tidenode.interface';
import { TaskList } from './task-list/task-list';
import { TideNodeService } from './services/tide-node-service';  // Add this import
import { TaskListItem } from './task-list-item/task-list-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [CommonModule, TaskList , TaskListItem]
})
export class AppComponent implements OnInit {
  title = 'abdul-aziz-memon-learning-angular';

  selectedTideNode: TideNode | undefined;

  constructor(private tideNodeService: TideNodeService) {}

  ngOnInit(): void {
    this.tideNodeService.getTideNodeById(1).subscribe(
      (tideNode: TideNode | undefined) => {
        this.selectedTideNode = tideNode;
      }
    );
  }

  onTaskSelected(tideNode: TideNode): void {

  }
}