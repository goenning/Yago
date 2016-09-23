import { Task } from "./task";

export abstract class TaskQueue {
  abstract count(): Promise<number>;
  abstract flush(): void;
  abstract enqueue(task: Task): Promise<Task>;
  abstract dequeue(): Promise<Task | undefined>;
}