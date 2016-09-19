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
      expect(anotherTask).deep.eq(task);
    });

    it("should only dequeue if it's ready to be processed", async () => {
      const task = new Task("hello-world", { startAt: new Date(2050, 1, 1, 1, 1, 1) });
      await queue.enqueue(task);
      const anotherTask = await queue.dequeue();
      expect(anotherTask).be.eq(null);
    });

    it("should enqueue in order", async () => {
      const firstEnqueued = new Task("hello-world", { startAt: new Date(2012, 1, 1, 1, 1, 1) });
      const secondEnqueued = new Task("hello-world");
      const thirdEnqueued = new Task("hello-world", { startAt: new Date(2010, 1, 1, 1, 1, 1) });

      await queue.enqueue(firstEnqueued);
      await queue.enqueue(secondEnqueued);
      await queue.enqueue(thirdEnqueued);

      const firstDequeued = await queue.dequeue();
      const secondDequeued = await queue.dequeue();
      const thirdDequeued = await queue.dequeue();

      expect(firstDequeued).deep.eq(secondEnqueued);
      expect(secondDequeued).deep.eq(thirdEnqueued);
      expect(thirdDequeued).deep.eq(firstEnqueued);
    });
  });
});