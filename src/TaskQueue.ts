import { Task } from "./Task";

export abstract class TaskQueue {
  abstract count(): Promise<number>;
  abstract flush(): void;
  abstract enqueue(task: Task): Promise<Task>;
  abstract dequeue(): Promise<Task>;
}