import { InProcessTaskQueue } from "../src/InProcessTaskQueue";
import { expect } from "chai";

describe("In Process Task Queue", () => {
  it("Should start empty", () => {
    const queue = new InProcessTaskQueue();
    expect(queue.count()).be.eq(0);
  });
});