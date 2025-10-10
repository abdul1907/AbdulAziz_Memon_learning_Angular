import { TideNode } from '../Models/tidenode.interface';

export const mockTideNodes: TideNode[] = [
  {
    taskId: 1,
    taskDescription: 'Compelete Angular Test',
    taskPriority: 'high',
    taskDueDate: 'Jan 20, 2025',
    taskEffort: 3,
    taskShiftReason: 'Moved due to other priorities'
  },
  {
    taskId: 2,
    taskDescription: 'Study TypeScript basics',
    taskPriority: 'medium',
    taskDueDate: 'Jan 20, 2025',
    taskEffort: 2
  },
  {
    taskId: 3,
    taskDescription: 'Practice Angular components',
    taskPriority: 'high',
    taskDueDate: 'Jan 20, 2025',
    taskEffort: 4,
    taskShiftReason: 'Extended for better understanding'
  },
  {
    taskId: 4,
    taskDescription: 'Review lecture notes',
    taskPriority: 'low',
    taskDueDate: 'Sep 25, 2025',
    taskEffort: 1
  },
  {
    taskId: 5,
    taskDescription: 'Prepare for exam',
    taskPriority: 'high',
    taskDueDate: 'Sep 25, 2025',
    taskEffort: 5,
    taskShiftReason: 'Prioritized over other tasks'
  },
  {
    taskId: 6,
    taskDescription: 'Update project documentation',
    taskPriority: 'medium',
    taskDueDate: 'Sep 25, 2025',
    taskEffort: 2
  }
];