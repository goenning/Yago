"use strict";
const InProcessTaskQueue_1 = require("../src/InProcessTaskQueue");
const chai_1 = require("chai");
describe("In Process Task Queue", () => {
    it("Should start empty", () => {
        const queue = new InProcessTaskQueue_1.InProcessTaskQueue();
        chai_1.expect(queue.count()).be.eq(0);
    });
});
