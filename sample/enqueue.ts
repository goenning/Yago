import { Task, RedisTaskQueue } from "../src";

const queue = new RedisTaskQueue("redis://localhost:6060");
queue.enqueue(new Task("greet", () => {
  return { payload: "Yagoooo" };
}));