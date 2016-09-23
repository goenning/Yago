import { expect } from "chai";
import { Task } from "../src/task";
import { Yago } from "../src/yago";
import { ExecutionResult, ExecutionResultOutcome } from "../src/task_runner";
import { HelloWorldTaskRunner } from "./dummy/helloworld_task_runner";
import { MemoryStream } from "./helper/memory_stream";

describe("Yago", () => {
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

  it("should process first task", (done) => {
    yago.enqueue("hello-world");

    output.on("data", (data: string) => {
      expect(data).to.be.eq("Hello World");
      done();
    });

    yago.start();
  });

  it("should process task with payload", (done) => {
    yago.enqueue("hello-world", { payload: "Yago" });

    output.on("data", (data: string) => {
      expect(data).to.be.eq("Hello World: Yago");
      done();
    });

    yago.start();
  });

  it("should emit process event for both tasks", (done) => {
    yago.enqueue("hello-world");
    yago.enqueue("hello-world");

    let count = 0;
    yago.on("process", (task: Task) => {
      count++;
      if (count === 2) {
        done();
      }
    });

    yago.start();
  });

  it("should emit processed event", (done) => {
    yago.enqueue("hello-world");

    let count = 0;
    yago.on("processed", (task: Task, result: ExecutionResult) => {
      expect(result.outcome).to.be.eq(ExecutionResultOutcome.Success);
      done();
    });

    yago.start();
  });

  it("should emit ignored event for unknown task", (done) => {
    yago.enqueue("send-email");

    let count = 0;
    yago.on("ignored", (task: Task) => {
      expect(task.name).to.be.eq("send-email");
      done();
    });

    yago.start();
  });
});