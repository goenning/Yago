import { TaskRunner, ExecutionContext } from "./TaskRunner";
import { TaskQueue } from "./TaskQueue";
import { Task, TaskOptions } from "./Task";
import { InProcessTaskQueue } from "./InProcessTaskQueue";

interface ITaskRunnerClass {
  new (): TaskRunner;
}

export class Yago {
  private queue: TaskQueue;
  private timer: NodeJS.Timer;
  private output: NodeJS.WritableStream;
  private taskRunnerClass: ITaskRunnerClass;

  constructor(output: NodeJS.WritableStream) {
    this.queue = new InProcessTaskQueue();
    this.output = output;
  }

  register(taskRunnerClass: ITaskRunnerClass): void {
    this.taskRunnerClass = taskRunnerClass;
  }

  enqueue(taskName: string, options?: TaskOptions): Promise<Task> {
    return this.queue.enqueue(new Task(taskName, options));
  }

  start(): void {
    this.timer = setInterval(() => {
      this.processQueue();
    }, 100);
  }

  stop(): void {
    clearInterval(this.timer);
  }

  private async processQueue(): Promise<Task> {
    const task = await this.queue.dequeue();
    if (task) {
      const ctx = new ExecutionContext(task, this.output);
      const runner = new this.taskRunnerClass();
      await runner.execute(ctx);
      return task;
    }
  }
}