import { InProcessTaskQueue } from "../src/InProcessTaskQueue";
import { RedisTaskQueue } from "../src/RedisTaskQueue";
import { TaskQueue } from "../src/TaskQueue";
import { expect } from "chai";
import { Task } from "../src/Task";

interface TestItem {
  name: string;
  newQueue: () => TaskQueue;
}

const items: TestItem[] = [
  { name: "InProcessTaskQueue", newQueue: () => new InProcessTaskQueue() },
  { name: "RedisQueue", newQueue: () => new RedisTaskQueue("redis://localhost:6060") }
];

items.forEach((item) => {
  describe(item.name, () => {
    let queue: TaskQueue;
    beforeEach(() => {
      queue = item.newQueue();
      queue.flush();
    });

    it("should start empty", async () => {
      const count = await queue.count();
      expect(count).be.eq(0);
    });

    it("should have 1 item after enqueue", async () => {
      await queue.enqueue(new Task("hello-world"));
      const count = await queue.count();
      expect(count).be.eq(1);
    });

    it("should have the same task after enqueue/dequeue", async () => {
      const task = new Task("hello-world");
      await queue.enqueue(task);
      const anotherTask = await queue.dequeue();
      expect(task).deep.eq(anotherTask);
    });
  });
});