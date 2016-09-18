import { Task } from "./Task";

export abstract class TaskQueue {
  abstract count(): Promise<number>;
  abstract flush(): void;
  abstract enqueue(task: Task): Promise<string>;
  abstract dequeue(): Promise<Task>;
}