import { TaskRunner, ITaskRunnerClass, ExecutionContext, ExecutionResult, ExecutionResultOutcome } from "./TaskRunner";
import { TaskQueue } from "./TaskQueue";
import { Task, TaskOptions } from "./Task";
import { InProcessTaskQueue } from "./InProcessTaskQueue";
import { EventEmitter } from "events";
import { CronJob } from "cron";

export interface YagoOptions {
  queue?: TaskQueue;
  interval?: number;
  output?: NodeJS.WritableStream;
}

export class Yago extends EventEmitter {
  private queue: TaskQueue;
  private timer: NodeJS.Timer;
  private output: NodeJS.WritableStream;
  private runners: { [key: string]: ITaskRunnerClass };
  private interval: number;

  constructor(options?: YagoOptions) {
    super();
    this.runners = {};
    this.queue = options && options.queue ? options.queue : new InProcessTaskQueue();
    this.output = options && options.output ? options.output : process.stdout;
    this.interval = options && options.interval ? options.interval : 1000;
  }

  register(runner: ITaskRunnerClass): void {
    if (runner.taskName) {
      this.runners[runner.taskName] = runner;
    }
  }

  schedule(cron: string, taskName: string, options?: TaskOptions): void {
    new CronJob(cron, () => {
      this.enqueue(taskName, options);
    }, undefined, true);
  }

  enqueue(taskName: string, options?: TaskOptions): Promise<Task> {
    const task = new Task(taskName, options);
    this.emit("enqueue", task);
    return this.queue.enqueue(task);
  }

  start(): void {
    this.timer = setInterval(() => {
      this.processQueue();
    }, 5);
  }

  stop(): void {
    clearInterval(this.timer);
  }

  private async processQueue(): Promise<ExecutionResult | undefined> {
    const task = await this.queue.dequeue();
    if (task) {
      if (this.runners[task.name]) {
        const ctx = new ExecutionContext(task, this.output);
        const runner = new this.runners[task.name]();

        this.emit("process", task);
        const result = await runner.execute(ctx);
        this.emit("processed", task, result);
        return result;
      } else {
        this.emit("ignored", task);
      }
    }
  }
}