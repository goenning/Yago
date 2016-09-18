import { TaskQueue } from "./TaskQueue";
import { Task } from "./Task";
import * as redis from "redis";

export class RedisTaskQueue extends TaskQueue {
  private client: redis.RedisClient;
  private key = "yago.queue";

  constructor(connString: string) {
    super();
    this.client = redis.createClient(connString);
  }

  enqueue(task: Task): Promise<string> {
    return new Promise((resolve, reject) => {
      this.client.zadd(this.key, task.getScore(), task.toJson(), (err, count) => {
        if (err)
          reject(err);
        resolve("SOME_ID");
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

  async dequeue(): Promise<Task> {
    let item: string = null;
    let count: number = null;

    do {
      item = await this.first();
      if (!item)
        return null;

      count = await this.remove(item);
    } while (count === 0);


    return item ? Task.fromJson(item) : null;
  }

  flush(): void {
    this.client.del(this.key);
  }

  private first(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.client.zrange(this.key, 0, 0, (err, list) => {
        if (list && list.length > 0)
          resolve(list[0]);

        resolve(null);
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