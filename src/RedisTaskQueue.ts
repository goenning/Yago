import { TaskQueue } from "./TaskQueue";

export class RedisTaskQueue extends TaskQueue {
  count(): number {
    return 0;
  }
}