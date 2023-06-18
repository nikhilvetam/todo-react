import { Moment } from "moment";

export interface ITask{
    taskName:string,
    completionDate:Date | null
}

export interface TaskProps{
    task:ITask;
    removeTask(taskName:string):void
}