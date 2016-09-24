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

  enqueue(task: Task): Promise<Task> {
    return new Promise((resolve, reject) => {
      this.client.zadd(this.key, task.getScore(), task.toJson(), (err, count) => {
        if (err)
          reject(err);
        resolve(task);
      });
    });
  }

  count(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.client.zcard(this.key, (err, count) => {
        if (err)
          reject(err);
        resolve(count);
      });
    });
  }

  async dequeue(): Promise<Task | undefined> {
    let item: string;
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


    return item ? Task.fromJson(item) : undefined;
  }

  flush(): void {
    this.client.del(this.key);
  }

  private first(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.client.zrange(this.key, 0, 0, (err, list) => {
        if (list && list.length > 0)
          resolve(list[0]);

        resolve(undefined);
      });
    });
  }

  private remove(item: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.client.zremrangebyrank(this.key, 0, 0, (err, count) => {
        if (err)
          resolve(0);

        resolve(count);
      });
    });
  }
}