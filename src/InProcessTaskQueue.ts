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

  async enqueue(task: Task): Promise<Task> {
    for (let i = 0; i < this.queue.length; i++) {
      if (this.queue[i].getScore() > task.getScore()) {
        this.queue.splice(i, 0, task);
        return task;
      }
    }

    this.queue.push(task);
    return task;
  }

  async dequeue(): Promise<Task> {
    const task = this.queue.shift();
    if (task && task.startAt && task.startAt > new Date())
      return undefined;
    return task;
  }

  flush(): void {
    this.queue = [];
  }
}