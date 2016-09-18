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
    const uuid = "SOME_ID";

    for (let i = 0; i < this.queue.length; i++) {
      if (this.queue[i].getScore() > task.getScore()) {
        this.queue.splice(i, 0, task);
        return uuid;
      }
    }

    this.queue.push(task);
    return uuid;
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