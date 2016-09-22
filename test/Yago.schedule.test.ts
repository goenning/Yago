import { expect } from "chai";
import { Task } from "../src/Task";
import { Yago } from "../src/Yago";
import { ExecutionResult, ExecutionResultOutcome } from "../src/TaskRunner";
import { HelloWorldTaskRunner } from "./dummy/HelloWorldTaskRunner";
import { MemoryStream } from "./helper/MemoryStream";

describe("Yago (schedule)", () => {
  let yago: Yago;
  let output: NodeJS.WritableStream;

  beforeEach(() => {
    output = new MemoryStream();
    yago = new Yago({
      output,
      interval: 5
    });
    yago.register(HelloWorldTaskRunner);
  });

  afterEach(() => {
    yago.stop();
  });

  it("should enqueue new task every second", (done) => {
    yago.enqueue("hello-world");
    yago.schedule("* * * * * *", "hello-world");

    yago.on("enqueue", (task: Task) => {
      expect(task.name).to.be.eq("hello-world");
      done();
    });

    yago.start();
  });
});