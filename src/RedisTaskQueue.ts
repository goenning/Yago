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
      this.client.zadd(this.key, task.getScore(), task.toJson(), (err, count) {
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

  flush(): void {
    this.client.del(this.key);
  }
}