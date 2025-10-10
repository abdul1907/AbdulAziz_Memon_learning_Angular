import { TestBed } from '@angular/core/testing';
import { TideNodeService } from './tide-node-service';
import { TideNode } from '../Models/tidenode.interface';


describe('TideNodeService', () => {
  let service: TideNodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TideNodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return all tide nodes', (done) => {
    service.getAllTideNodes().subscribe(tideNodes => {
      expect(tideNodes).toBeDefined();
      expect(tideNodes.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should return a specific tide node by ID', (done) => {
    service.getTideNodeById(1).subscribe(tideNode => { 
      expect(tideNode).toBeDefined();  
      expect(tideNode?.taskId).toBe(1);  
      done();  
    });
  });


  it('should add a new tide node', (done) => {
    const newTideNode: TideNode = {  
      taskId: 999,
      taskDescription: 'Test Task',
      taskPriority: 'medium',
      taskDueDate: 'Jan 30, 2025',
      taskEffort: 2
    };

    service.addTideNode(newTideNode).subscribe(updatedArray => {  
      expect(updatedArray).toBeDefined(); 
      const addedNode = updatedArray.find(node => node.taskId === 999);  
      expect(addedNode).toBeDefined();  
      done();  
    });
  });

  
  it('should update an existing tide node', (done) => {
    const updatedTideNode: TideNode = { 
      taskId: 1,
      taskDescription: 'Updated Task',
      taskPriority: 'high',
      taskDueDate: 'Jan 20, 2025',
      taskEffort: 5
    };

    service.updateTideNode(updatedTideNode).subscribe(updatedArray => {  
      expect(updatedArray).toBeDefined();  
      const updatedNode = updatedArray.find(node => node.taskId === 1);  
      expect(updatedNode?.taskDescription).toBe('Updated Task'); 
      done();  
    });
  });

  
  it('should delete a tide node by ID', (done) => {
    service.deleteTideNode(2).subscribe(deletedNode => {  
      expect(deletedNode).toBeDefined();  
      expect(deletedNode?.taskId).toBe(2);  
      done();  
    });
  });
});


