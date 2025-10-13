// Import statements: Bring in required testing modules and classes
// import: ES6 module syntax for importing code from other files

// TestBed: Angular testing utility for configuring and creating components/services for testing
// '@angular/core/testing': Angular testing module containing testing utilities
import { TestBed } from '@angular/core/testing';

// TideNodeService: Service class that we want to test
// './tide-node-service': Relative path to the service file
import { TideNodeService } from './tide-node-service';

// TideNode: Interface defining the structure of a task
// '../Models/tidenode.interface': Relative path to the interface file
import { TideNode } from '../Models/tidenode.interface';

// Test suite: Groups related tests together
// describe(): Jasmine testing function that creates a test suite
// 'TideNodeService': Name of the test suite (usually matches the class being tested)
// () => { ... }: Arrow function containing all the tests for this suite
describe('TideNodeService', () => {
  // service: TideNodeService - variable to hold the service instance for testing
  let service: TideNodeService;

  // beforeEach() runs before each test case
  // Sets up the testing environment and creates a fresh service instance
  beforeEach(() => {
    // TestBed.configureTestingModule({}) - configures the testing module
    // Empty configuration uses default settings for testing
    TestBed.configureTestingModule({});
    
    // TestBed.inject(TideNodeService) - creates an instance of the service for testing
    service = TestBed.inject(TideNodeService);
  });

  // Test case: should be created
  // it() defines an individual test case
  it('should be created', () => {
    // expect(service).toBeTruthy() - assertion that checks if service exists
    expect(service).toBeTruthy();
  });

  // Test case: should return all tide nodes
  it('should return all tide nodes', (done) => {
    // Call the service method and subscribe to the Observable
    service.getAllTideNodes().subscribe(tideNodes => {
      // Assertions to verify the returned data
      expect(tideNodes).toBeDefined(); // Check that data is not undefined
      expect(tideNodes.length).toBeGreaterThan(0); // Check that array has items
      done(); // Signal that the async test is complete
    });
  });

  // Test case: should return a specific tide node by ID
  it('should return a specific tide node by ID', (done) => {
    // Call the service method with ID 1
    service.getTideNodeById(1).subscribe(tideNode => { 
      // Assertions to verify the returned tide node
      expect(tideNode).toBeDefined(); // Check that tide node exists
      expect(tideNode?.taskId).toBe(1); // Check that the ID matches
      done(); // Signal that the async test is complete
    });
  });

  // Test case: should add a new tide node
  it('should add a new tide node', (done) => {
    // Create a new tide node with all required properties
    const newTideNode: TideNode = {  
      taskId: 999,
      taskDescription: 'Test Task',
      taskPriority: 'medium',
      taskDueDate: 'Jan 30, 2025',
      taskEffort: 2,
      
      // NEW REQUIRED PROPERTIES FOR UPDATED INTERFACE:
      createdAt: '2025-01-20T10:00:00Z',
      updatedAt: '2025-01-20T10:00:00Z',
      status: 'active',
      category: 'test',
      tags: ['test', 'example'],
      isHighTide: false,
      isLowTide: false
    };

    // Call the service method to add the new tide node
    service.addTideNode(newTideNode).subscribe(updatedArray => {  
      // Assertions to verify the addition was successful
      expect(updatedArray).toBeDefined(); // Check that array is returned
      const addedNode = updatedArray.find(node => node.taskId === 999); // Find the added node
      expect(addedNode).toBeDefined(); // Check that the node was added
      done(); // Signal that the async test is complete
    });
  });

  // Test case: should update an existing tide node
  it('should update an existing tide node', (done) => {
    // Create an updated tide node with all required properties
    const updatedTideNode: TideNode = { 
      taskId: 1,
      taskDescription: 'Updated Task',
      taskPriority: 'high',
      taskDueDate: 'Jan 20, 2025',
      taskEffort: 5,
      
      // NEW REQUIRED PROPERTIES FOR UPDATED INTERFACE:
      createdAt: '2025-01-15T10:00:00Z',
      updatedAt: '2025-01-20T10:00:00Z',
      status: 'active',
      category: 'academic',
      tags: ['angular', 'test', 'updated'],
      isHighTide: true,
      isLowTide: false
    };

    // Call the service method to update the tide node
    service.updateTideNode(updatedTideNode).subscribe(updatedArray => {  
      // Assertions to verify the update was successful
      expect(updatedArray).toBeDefined(); // Check that array is returned
      const updatedNode = updatedArray.find(node => node.taskId === 1); // Find the updated node
      expect(updatedNode?.taskDescription).toBe('Updated Task'); // Check that description was updated
      done(); // Signal that the async test is complete
    });
  });

  // Test case: should delete a tide node by ID
  it('should delete a tide node by ID', (done) => {
    // Call the service method to delete tide node with ID 2
    service.deleteTideNode(2).subscribe(deletedNode => {  
      // Assertions to verify the deletion was successful
      expect(deletedNode).toBeDefined(); // Check that deleted node is returned
      expect(deletedNode?.taskId).toBe(2); // Check that the correct node was deleted
      done(); // Signal that the async test is complete
    });
  });

  // NEW TEST CASES FOR TIDE FUNCTIONALITY:

  // Test case: should calculate tide level correctly
  it('should calculate tide level correctly', () => {
    // Create a test tide node
    const testTideNode: TideNode = {
      taskId: 100,
      taskDescription: 'Test Tide Calculation',
      taskPriority: 'high',
      taskDueDate: '2025-01-21', // Tomorrow
      taskEffort: 3,
      createdAt: '2025-01-20T10:00:00Z',
      updatedAt: '2025-01-20T10:00:00Z',
      status: 'active',
      category: 'test',
      tags: ['test'],
      isHighTide: false,
      isLowTide: false
    };

    // Call the calculateTideLevel method
    const tideLevel = service.calculateTideLevel(testTideNode);
    
    // Assertions to verify tide level calculation
    expect(tideLevel).toBeGreaterThan(0); // Check that tide level is positive
    expect(tideLevel).toBeLessThanOrEqual(100); // Check that tide level doesn't exceed 100
    expect(tideLevel).toBeGreaterThan(70); // High priority + due tomorrow should be high tide
  });

  // Test case: should get high tide tasks
  it('should get high tide tasks', (done) => {
    // Call the service method to get high tide tasks
    service.getHighTideTasks().subscribe(highTideTasks => {
      // Assertions to verify high tide tasks
      expect(highTideTasks).toBeDefined(); // Check that array is returned
      expect(Array.isArray(highTideTasks)).toBe(true); // Check that it's an array
      
      // Check that all returned tasks are in high tide
      highTideTasks.forEach(task => {
        expect(task.isHighTide).toBe(true); // Each task should be in high tide
        expect(task.status).toBe('active'); // Each task should be active
      });
      
      done(); // Signal that the async test is complete
    });
  });

  // Test case: should get low tide tasks
  it('should get low tide tasks', (done) => {
    // Call the service method to get low tide tasks
    service.getLowTideTasks().subscribe(lowTideTasks => {
      // Assertions to verify low tide tasks
      expect(lowTideTasks).toBeDefined(); // Check that array is returned
      expect(Array.isArray(lowTideTasks)).toBe(true); // Check that it's an array
      
      // Check that all returned tasks are in low tide
      lowTideTasks.forEach(task => {
        expect(task.isLowTide).toBe(true); // Each task should be in low tide
        expect(task.status).toBe('active'); // Each task should be active
      });
      
      done(); // Signal that the async test is complete
    });
  });
});
