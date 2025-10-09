import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TideNode } from '../Models/tidenode.interface';
import { mockTideNodes } from '../data/mock-content';


@Injectable({
  providedIn: 'root'
})
export class TideNodeService {
  private tideNodes: TideNode[] = [...mockTideNodes];

  constructor() {
  }
  getAllTideNodes(): Observable<TideNode[]> {
    return of([...this.tideNodes]);
  }

  // Read by Id
  getTideNodeById(id: number): Observable<TideNode | undefined> {
    const tideNode = this.tideNodes.find(node => node.taskId === id);
    return of(tideNode);
  }
  // Create by Id
  addTideNode(tideNode: TideNode): Observable<TideNode[]> {
    this.tideNodes.push(tideNode);
    return of([...this.tideNodes]);
  }

  // Update by Id
  updateTideNode(updatedTideNode: TideNode): Observable<TideNode[]> {
    const index = this.tideNodes.findIndex(node => node.taskId === updatedTideNode.taskId);
    if (index !== -1) {
      this.tideNodes[index] = updatedTideNode;
    }
    return of([...this.tideNodes]); 
  }

  // Delete by Id
  deleteTideNode(id: number): Observable<TideNode | undefined> {
    const index = this.tideNodes.findIndex(node => node.taskId === id);
    if (index !== -1) {
      const deleteNode = this.tideNodes.splice(index, 1) [0];
      return of (deleteNode);
    }
    return of(undefined);
  }
}
