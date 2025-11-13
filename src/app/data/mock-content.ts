import { TideNode } from '../Models/tidenode.interface';

// Mock data array containing sample tasks for the TaskTide application
// Each task represents a "tide node" that can flow between high and low tide based on priority and urgency
export const mockTideNodes: TideNode[] = [
  {
    // Task ID: Unique identifier for this task
    id: 1,
    
    // Description: What needs to be done
    taskDescription: 'Complete Angular Test',
    
    // Priority: High priority means this task rises to "high tide" (urgent focus)
    taskPriority: 'high',
    
    // Due date: When this task needs to be completed
    taskDueDate: 'Jan 20, 2025',
    
    // Effort: Estimated hours to complete (affects tide calculations)
    taskEffort: 3,
    
    // Shift reason: Why this task was moved or deferred
    taskShiftReason: 'Moved due to other priorities',
    
    // NEW PROPERTIES FOR ENHANCED TIDE FUNCTIONALITY:
    
    // Current tide level: Calculated value (0-100) showing how urgent this task is
    currentTideLevel: 85,
    
    // Creation timestamp: When this task was first created
    createdAt: '2025-01-15T10:00:00Z',
    
    // Last update timestamp: When this task was last modified
    updatedAt: '2025-01-18T14:30:00Z',
    
    // Status: Current state of the task in the workflow
    status: 'active',
    
    // Category: Type of task for organization
    category: 'academic',
    
    // Tags: Keywords for filtering and organization
    tags: ['angular', 'test', 'urgent'],
    
    // High tide flag: Whether this task is currently in urgent focus
    isHighTide: true,
    
    // Low tide flag: Whether this task can be deferred
    isLowTide: false
  },
  {
    id: 2,
    taskDescription: 'Study TypeScript basics',
    taskPriority: 'medium',
    taskDueDate: 'Jan 20, 2025',
    taskEffort: 2,
    
    // No shift reason for this task
    taskShiftReason: undefined,
    
    // Medium priority = medium tide level
    currentTideLevel: 60,
    createdAt: '2025-01-16T09:00:00Z',
    updatedAt: '2025-01-19T11:15:00Z',
    status: 'active',
    category: 'learning',
    tags: ['typescript', 'programming', 'basics'],
    isHighTide: false,
    isLowTide: false
  },
  {
    id: 3,
    taskDescription: 'Practice Angular components',
    taskPriority: 'high',
    taskDueDate: 'Jan 20, 2025',
    taskEffort: 4,
    taskShiftReason: 'Extended for better understanding',
    
    // High priority with extended effort = very high tide
    currentTideLevel: 90,
    createdAt: '2025-01-14T08:30:00Z',
    updatedAt: '2025-01-19T16:45:00Z',
    status: 'active',
    category: 'practice',
    tags: ['angular', 'components', 'hands-on'],
    isHighTide: true,
    isLowTide: false
  },
  {
    id: 4,
    taskDescription: 'Review lecture notes',
    taskPriority: 'low',
    taskDueDate: 'Sep 25, 2025',
    taskEffort: 1,
    
    // Low priority = low tide (can be deferred)
    currentTideLevel: 25,
    createdAt: '2025-01-17T13:20:00Z',
    updatedAt: '2025-01-19T10:00:00Z',
    status: 'active',
    category: 'review',
    tags: ['notes', 'review', 'low-priority'],
    isHighTide: false,
    isLowTide: true
  },
  {
    id: 5,
    taskDescription: 'Prepare for exam',
    taskPriority: 'high',
    taskDueDate: 'Sep 25, 2025',
    taskEffort: 5,
    taskShiftReason: 'Prioritized over other tasks',
    
    // High priority with high effort = maximum tide level
    currentTideLevel: 95,
    createdAt: '2025-01-13T07:00:00Z',
    updatedAt: '2025-01-19T18:30:00Z',
    status: 'active',
    category: 'exam',
    tags: ['exam', 'preparation', 'critical'],
    isHighTide: true,
    isLowTide: false
  },
  {
    id: 6,
    taskDescription: 'Update project documentation',
    taskPriority: 'medium',
    taskDueDate: 'Sep 25, 2025',
    taskEffort: 2,
    
    // Medium priority = medium tide level
    currentTideLevel: 55,
    createdAt: '2025-01-18T15:45:00Z',
    updatedAt: '2025-01-19T12:20:00Z',
    status: 'active',
    category: 'documentation',
    tags: ['docs', 'project', 'maintenance'],
    isHighTide: false,
    isLowTide: false
  }
];