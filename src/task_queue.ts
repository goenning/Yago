import { Task } from "./task";
import { EventEmitter } from "events";

export abstract class TaskQueue extends EventEmitter {
  abstract count(): Promise<number>;
  abstract flush(): void;
  abstract enqueue(task: Task): Promise<Task>;
  abstract dequeue(): Promise<Task | undefined>;
}