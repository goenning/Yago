import { TaskRunner, ExecutionContext, ExecutionResult } from "./TaskRunner";
import { TaskQueue } from "./TaskQueue";
import { Task, TaskOptions } from "./Task";
import { InProcessTaskQueue } from "./InProcessTaskQueue";
import { EventEmitter } from "events";

interface ITaskRunnerClass {
  new (): TaskRunner;
}

export interface YagoOptions {
  queue?: TaskQueue;
  interval?: number;
  output?: NodeJS.WritableStream;
}

export class Yago extends EventEmitter {
  private queue: TaskQueue;
  private timer: NodeJS.Timer;
  private output: NodeJS.WritableStream;
  private taskRunnerClass: ITaskRunnerClass;
  private interval: number;

  constructor(options?: YagoOptions) {
    super();
    this.queue = options && options.queue ? options.queue : new InProcessTaskQueue();
    this.output = options && options.output ? options.output : process.stdout;
    this.interval = options && options.interval ? options.interval : 1000;
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
    }, 5);
  }

  stop(): void {
    clearInterval(this.timer);
  }

  private async processQueue(): Promise<ExecutionResult> {
    const task = await this.queue.dequeue();
    if (task) {
      const ctx = new ExecutionContext(task, this.output);
      const runner = new this.taskRunnerClass();
      this.emit("process", task);
      return await runner.execute(ctx);
    }
  }
}