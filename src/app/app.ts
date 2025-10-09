import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TideNode } from './Models/tidenode.interface';
import { TaskList } from './task-list/task-list';
import { TideNodeService } from './services/tide-node-service';  // Add this import

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [CommonModule, TaskList]
})
export class AppComponent implements OnInit {
  title = 'abdul-aziz-memon-learning-angular';

  selectedTideNode: TideNode | undefined;

  constructor(private tideNodeServices: TideNodeService) {}

  ngOnInit(): void {
    this.tideNodeServices.getTideNodeById(1).subscribe(
      (tideNode: TideNode | undefined) => {
        this.selectedTideNode = tideNode;
      }
    );
  }
}