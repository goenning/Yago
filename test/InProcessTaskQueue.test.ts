import { InProcessTaskQueue } from "../src/InProcessTaskQueue";
import { RedisTaskQueue } from "../src/RedisTaskQueue";
import { TaskQueue } from "../src/TaskQueue";
import { expect } from "chai";

interface TestItem {
  name: string;
  newQueue: () => TaskQueue;
}

const items: TestItem[] = [
  { name: "InProcessTaskQueue", newQueue: () => new InProcessTaskQueue() },
  { name: "RedisQueue", newQueue: () => new RedisTaskQueue() }
];

items.forEach((item) => {
  describe(item.name, () => {
    let queue: TaskQueue;
    beforeEach(() => {
      queue = item.newQueue();
    });

    it("should start empty", () => {
      const queue = new InProcessTaskQueue();
      expect(queue.count()).be.eq(0);
    });
  });
});