import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TideNode } from '../Models/tidenode.interface';
import { HttpClient } from '@angular/common/http';
import { mockTideNodes } from '../data/mock-content';

// Injectable decorator marks this class as a service that can be injected into other components
// providedIn: 'root' means this service is available throughout the entire application
@Injectable({
  providedIn: 'root'
})
export class TideNodeService {
  // Private property to store all tide nodes (tasks) in memory
  // Using spread operator [...] to create a copy of mock data, not reference
  private apiUrl = 'api/tideNodes';
  private tideNodes: TideNode[] = [...mockTideNodes];

  // Constructor - called when the service is instantiated
  // Currently empty but can be used for initialization
  constructor(private http: HttpClient) {}

  // Method to get all tide nodes as an Observable
  // Observable allows components to subscribe to data changes reactively
  getAllTideNodes(): Observable<TideNode[]> {
    return this.http.get<TideNode[]>(this.apiUrl);
  }

  // Method to get a specific tide node by its ID
  // Returns Observable<TideNode | undefined> - undefined if not found
  getTideNodeById(id: number): Observable<TideNode> {
    return this.http.get<TideNode>(`${this.apiUrl}/${id}`);
  }

  // Method to add a new tide node to the collection
  // Takes a TideNode object and returns all tide nodes after addition
  addTideNode(tideNode: TideNode): Observable<TideNode> {
    return this.http.post<TideNode>(this.apiUrl, tideNode);
  }

  // Method to update an existing tide node
  // Takes an updated TideNode and replaces the existing one with matching ID
  updateTideNode(updatedTideNode: TideNode): Observable<TideNode> {
    const url = `${this.apiUrl}/${updatedTideNode.id}`;
    return this.http.put<TideNode>(url, updatedTideNode);
  }

  // Method to delete a tide node by ID
  // Returns the deleted tide node or undefined if not found
  deleteTideNode(id: number): Observable<{}> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  generateNewTaskId(): number {
    return this.tideNodes.length > 0 ? Math.max(...this.tideNodes.map(node => node.id)) + 1 : 1;
  }
  
}
  // NEW METHODS FOR TIDE CALCULATION AND MANAGEMENT:

//   // Method to calculate tide level for a given tide node
//   // Tide level (0-100) is calculated based on priority, due date proximity, and effort
//   calculateTideLevel(tideNode: TideNode): number {
//     let tideLevel = 0;

//     // Priority weight: High = 40 points, Medium = 25 points, Low = 10 points
//     switch (tideNode.taskPriority) {
//       case 'high':
//         tideLevel += 40;
//         break;
//       case 'medium':
//         tideLevel += 25;
//         break;
//       case 'low':
//         tideLevel += 10;
//         break;
//     }

//     // Due date proximity: Calculate days until due date
//     const today = new Date();
//     const dueDate = new Date(tideNode.taskDueDate);
//     const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

//     // Due date weight: Closer due dates get higher tide levels
//     if (daysUntilDue <= 1) {
//       tideLevel += 35; // Due today or tomorrow = high urgency
//     } else if (daysUntilDue <= 3) {
//       tideLevel += 25; // Due within 3 days = medium-high urgency
//     } else if (daysUntilDue <= 7) {
//       tideLevel += 15; // Due within a week = medium urgency
//     } else {
//       tideLevel += 5; // Due later = low urgency
//     }

//     // Effort weight: Higher effort tasks get slightly higher tide levels
//     // This encourages breaking down large tasks
//     if (tideNode.taskEffort >= 5) {
//       tideLevel += 15; // Large tasks need more attention
//     } else if (tideNode.taskEffort >= 3) {
//       tideLevel += 10; // Medium tasks
//     } else {
//       tideLevel += 5; // Small tasks
//     }

//     // Cap the tide level at 100
//     return Math.min(tideLevel, 100);
//   }

//   // Method to update tide levels for all active tasks
//   // This simulates the "tide flow" - tasks rise and fall based on changing conditions
//   updateAllTideLevels(): Observable<TideNode[]> {
//     // Iterate through all tide nodes and recalculate their tide levels
//     this.tideNodes.forEach(tideNode => {
//       if (tideNode.status === 'active') {
//         // Calculate new tide level
//         const newTideLevel = this.calculateTideLevel(tideNode);
        
//         // Update tide level and flags
//         tideNode.currentTideLevel = newTideLevel;
//         tideNode.isHighTide = newTideLevel >= 70; // High tide if level >= 70
//         tideNode.isLowTide = newTideLevel <= 30; // Low tide if level <= 30
        
//         // Update the timestamp
//         tideNode.updatedAt = new Date().toISOString();
//       }
//     });

//     // Return updated tide nodes
//     return of([...this.tideNodes]);
//   }

//   // Method to get tasks in high tide (urgent focus)
//   // Returns only tasks that are currently in high tide state
//   getHighTideTasks(): Observable<TideNode[]> {
//     const highTideTasks = this.tideNodes.filter(tideNode => 
//       tideNode.isHighTide && tideNode.status === 'active'
//     );
//     return of(highTideTasks);
//   }

//   // Method to get tasks in low tide (can be deferred)
//   // Returns only tasks that are currently in low tide state
//   getLowTideTasks(): Observable<TideNode[]> {
//     const lowTideTasks = this.tideNodes.filter(tideNode => 
//       tideNode.isLowTide && tideNode.status === 'active'
//     );
//     return of(lowTideTasks);
//   }

//   // Method to shift a task's tide level (move between high/low tide)
//   // This allows manual adjustment of task priorities
//   shiftTaskTide(taskId: number, newPriority: 'low' | 'medium' | 'high', shiftReason?: string): Observable<TideNode | undefined> {
//     const tideNode = this.tideNodes.find(node => node.taskId === taskId);
    
//     if (tideNode) {
//       // Update priority and shift reason
//       tideNode.taskPriority = newPriority;
//       tideNode.taskShiftReason = shiftReason;
      
//       // Recalculate tide level with new priority
//       const newTideLevel = this.calculateTideLevel(tideNode);
//       tideNode.currentTideLevel = newTideLevel;
//       tideNode.isHighTide = newTideLevel >= 70;
//       tideNode.isLowTide = newTideLevel <= 30;
      
//       // Update timestamp
//       tideNode.updatedAt = new Date().toISOString();
      
//       return of(tideNode);
//     }
    
//     return of(undefined);
//   }

//   // Method to get tasks by category
//   // Allows filtering tasks by their category (e.g., 'academic', 'work', 'personal')
//   getTasksByCategory(category: string): Observable<TideNode[]> {
//     const categoryTasks = this.tideNodes.filter(tideNode => 
//       tideNode.category === category && tideNode.status === 'active'
//     );
//     return of(categoryTasks);
//   }

//   // Method to search tasks by description or tags
//   // Provides basic search functionality for finding specific tasks
//   searchTasks(searchTerm: string): Observable<TideNode[]> {
//     const searchLower = searchTerm.toLowerCase();
//     const searchResults = this.tideNodes.filter(tideNode => 
//       tideNode.taskDescription.toLowerCase().includes(searchLower) ||
//       tideNode.tags.some(tag => tag.toLowerCase().includes(searchLower))
//     );
//     return of(searchResults);
//   }
// }
