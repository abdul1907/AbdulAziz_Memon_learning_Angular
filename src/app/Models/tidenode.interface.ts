

export interface TideNode {
    
    taskId: number;
    
    
    taskDescription: string;
    
    
    taskPriority: 'low' | 'medium' | 'high';
    
    
    taskDueDate: string;
    
   
    taskEffort: number;
    
    
    taskShiftReason?: string;
    
   
    
    // Current tide level calculated based on priority, due date, and effort
    // Range: 0-100 (0 = low tide, 100 = high tide)
    currentTideLevel?: number;
    
   
    createdAt: string;
    
   
    updatedAt: string;
    
    
    status: 'active' | 'completed' | 'deferred' | 'cancelled';
    
    
    category: string;
    
    
    tags: string[];
    
    
    isHighTide: boolean;
    
    
    isLowTide: boolean;
}
