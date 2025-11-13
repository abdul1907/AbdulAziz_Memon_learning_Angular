import { InMemoryDbService } from 'angular-in-memory-web-api';
import { TideNode } from '../Models/tidenode.interface';


export class InMemoryDataService implements InMemoryDbService {
  createDb(): { tideNodes: TideNode[] } {
    const tideNodes: TideNode[] = [
      {
        id: 1,
        taskDescription: 'Complete Angular Test',
        taskPriority: 'high',
        taskDueDate: 'Jan 20, 2025',
        taskEffort: 3,
        taskShiftReason: 'Moved due to other priorities',
        currentTideLevel: 85,
        createdAt: '2025-01-15T10:00:00Z',
        updatedAt: '2025-01-18T14:30:00Z',
        status: 'active',
        category: 'academic',
        tags: ['angular', 'test', 'urgent'],
        isHighTide: true,
        isLowTide: false
      },
      {
        id: 2,
        taskDescription: 'Study TypeScript basics',
        taskPriority: 'medium',
        taskDueDate: 'Jan 20, 2025',
        taskEffort: 2,
        taskShiftReason: undefined,
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
        taskShiftReason: undefined,
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
        taskShiftReason: undefined,
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
    return { tideNodes };
  }
}
