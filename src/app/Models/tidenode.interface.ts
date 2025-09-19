type DateTime = string & { DisplayFormat : string};

export interface TideNode {
    taskId : number;
    taskDescription : string;
    taskPriority : 'low' | 'medium' | 'high';
    taskDueDate : DateTime;
    taskEffort : number;
    taskShiftReason?: string;
}