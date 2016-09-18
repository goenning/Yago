import { TaskQueue } from "./TaskQueue";
import { Task } from "./Task";

export class InProcessTaskQueue extends TaskQueue {
  private queue: Task[] = [];

  constructor() {
    super();
  }

  count(): Promise<number> {
    return Promise.resolve(this.queue.length);
  }

  enqueue(task: Task): Promise<string> {
    this.queue.push(task);
    return Promise.resolve("SOME_ID");
  }

  dequeue(): Promise<Task> {
    return Promise.resolve(this.queue.shift());
  }

  flush(): void {

  }
}