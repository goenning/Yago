import { TaskQueue } from "./task_queue";
import { Task } from "./task";
import * as redis from "redis";

export class RedisTaskQueue extends TaskQueue {
  private client: redis.RedisClient;
  private key = "yago.queue";

  constructor(connString: string) {
    super();
    this.client = redis.createClient(connString);
  }

  async enqueue(task: Task): Promise<Task> {
    await this.sendCommand("ZADD", this.key, task.getScore(), task.toJson());
    return task;
  }

  async count(): Promise<number> {
    return await this.sendCommand<number>("ZCARD", this.key);
  }

  async dequeue(): Promise<Task | undefined> {
    let item: string | undefined;
    let count: number;

    do {
      item = await this.first();
      if (!item)
        return undefined;

      const task = Task.fromJson(item);
      if (task.startAt && task.startAt > new Date())
        return undefined;

      count = await this.remove(item);
    } while (count === 0);

    return Task.fromJson(item);
  }

  flush(): void {
    this.client.del(this.key);
  }

  private async first(): Promise<string | undefined> {
    const list = await this.sendCommand<string[]>("ZRANGE", this.key, 0, 0);
    if (list && list.length > 0)
      return list[0];
  }

  private async remove(item: string): Promise<number> {
    return await this.sendCommand<number>("ZREMRANGEBYRANK", this.key, 0, 0);
  }

  private sendCommand<T>(command: string, ...args: any[]): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.client.send_command(command, args, (err: any, obj: T) => {
        if (err)
          reject(err);
        resolve(obj);
      });
    });
  };
}