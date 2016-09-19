import { expect } from "chai";
import { Task } from "../src/Task";
import { Yago } from "../src/Yago";
import { HelloWorldTaskRunner } from "./dummy/HelloWorldTaskRunner";
import { Writable, WritableOptions } from "stream";

class MemoryStream extends Writable {
  constructor(opts?: WritableOptions) {
    super(opts);
  }

  _write(chunk: any, encoding: string, callback: Function): void {
    this.emit("data", chunk.toString("UTF-8"));
    callback();
  }
}

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

    output.on("data", (data) => {
      expect(data).to.be.eq("Hello World");
      done();
    });

    yago.start();
  });

  it("should process task with payload", (done) => {
    yago.enqueue("hello-world", { payload: "Yago" });

    output.on("data", (data) => {
      expect(data).to.be.eq("Hello World: Yago");
      done();
    });

    yago.start();
  });

  it("should process two tasks", (done) => {
    yago.enqueue("hello-world");
    yago.enqueue("hello-world");

    let count = 0;
    output.on("data", (data) => {
      count++;
      if (count === 2) {
        done();
      }
    });

    yago.start();
  });
});