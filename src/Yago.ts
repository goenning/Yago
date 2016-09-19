import { TaskRunner } from "./TaskRunner";
import { TaskQueue } from "./TaskQueue";
import { Task } from "./Task";
import { InProcessTaskQueue } from "./InProcessTaskQueue";

interface ITaskRunnerClass {
  new (): TaskRunner;
}

export class Yago {
  private queue: TaskQueue;
  constructor() {
    this.queue = new InProcessTaskQueue();
  }

  register(taskRunnerClass: ITaskRunnerClass): void {
    
  }

  enqueue(task: Task): void {
    this.queue.enqueue(task).then();
  }

  start(): void {
    
  }
}