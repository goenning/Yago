import { TaskQueue } from "./task_queue";
import { Task } from "./task";

export class InProcessTaskQueue extends TaskQueue {
  private queue: Task[] = [];

  constructor() {
    super();
  }

  count(): Promise<number> {
    return Promise.resolve(this.queue.length);
  }

  enqueue(task: Task): Promise<Task> {
    for (let i = 0; i < this.queue.length; i++) {
      if (this.queue[i].getScore() > task.getScore()) {
        this.queue.splice(i, 0, task);
        return Promise.resolve(task);
      }
    }

    this.queue.push(task);
    return Promise.resolve(task);
  }

  dequeue(): Promise<Task | undefined> {
    const task = this.queue.shift();
    if (task && task.startAt && task.startAt > new Date()) {
      return this.enqueue(task).then(() => {
        return undefined;
      });
    }
    return Promise.resolve(task);
  }

  flush(): void {
    this.queue = [];
  }
}