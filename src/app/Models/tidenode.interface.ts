type Timestamp = string & { formattedDay : string};

export interface TideNode {
    id : number;
    taskName : string;
    priority : 'low' | 'medium' | 'high';
    dueDate : Timestamp;
    effort : number;
    shiftNode?: string;
}