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
}
