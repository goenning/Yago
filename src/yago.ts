import { TaskRunner, ITaskRunnerClass, ExecutionContext, ExecutionResult, ExecutionResultOutcome } from "./task_runner";
import { TaskQueue } from "./task_queue";
import { Task, TaskOptions } from "./task";
import { InProcessTaskQueue } from "./inprocess_task_queue";
import { EventEmitter } from "events";
import { CronJob } from "cron";
import { Logger } from "./logger";
import { StandardLogger } from "./logger/standard_logger";

export interface YagoOptions {
  queue?: TaskQueue;
  interval?: number;
  logger?: Logger;
}

export class Yago extends EventEmitter {
  public readonly queue: TaskQueue;
  public readonly logger: Logger;
  public readonly runners: { [key: string]: ITaskRunnerClass };
  public readonly interval: number;

  private timer: NodeJS.Timer;

  constructor(options?: YagoOptions) {
    super();
    this.runners = {};
    this.logger = options && options.logger ? options.logger : new StandardLogger(process.stdout);
    this.queue = options && options.queue ? options.queue : new InProcessTaskQueue();
    this.interval = options && options.interval ? options.interval : 500;
  }

  register(runner: ITaskRunnerClass): void {
    if (runner.taskName) {
      this.runners[runner.taskName] = runner;
    } else
      throw new Error(`${runner.name} does not have a RunTask decoration.`);
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
      this._processQueue();
    }, this.interval);
  }

  stop(): void {
    clearInterval(this.timer);
  }

  private async _processQueue(): Promise<ExecutionResult | undefined> {
    let retry = 0;
    const task = await this.queue.dequeue();
    if (task) {
      if (this.runners[task.name]) {
        const ctx = new ExecutionContext(task, this.logger);
        const runner = new this.runners[task.name]();

        do {
          this.emit("process", task);
          try {
            const result = await runner.execute(ctx);
            this.emit("processed", task, result);
            return result;
          } catch (err) {
            this.emit("errored", task, err);
          }
        } while (++retry < runner.retryCount());
      } else {
        this.emit("ignored", task);
      }
    }
  }
}