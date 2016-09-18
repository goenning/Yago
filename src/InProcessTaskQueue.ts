import { TaskQueue } from "./TaskQueue";
import { Task } from "./Task";

export class InProcessTaskQueue extends TaskQueue {
  private queue: Task[] = [];

  constructor() {
    super();
  }

  async count(): Promise<number> {
    return this.queue.length;
  }

  async enqueue(task: Task): Promise<string> {
    this.queue.push(task);
    return "SOME_ID";
  }

  async dequeue(): Promise<Task> {
    const task = this.queue.shift();
    if (task.startAt && task.startAt > new Date())
      return null;
    return task;
  }

  flush(): void {
    this.queue = [];
  }
}