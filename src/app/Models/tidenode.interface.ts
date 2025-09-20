export interface TideNode {
    taskId : number;
    taskDescription : string;
    taskPriority : 'low' | 'medium' | 'high';
    taskDueDate : string;
    taskEffort : number;
    taskShiftReason?: string;
}