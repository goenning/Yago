import { expect } from "chai";
import { Task } from "../src/Task";
import { Yago } from "../src/Yago";
import { HelloWorldTaskRunner } from "./dummy/HelloWorldTaskRunner";
import { Writable } from "stream";

class MemoryStream extends Writable {
    public data: string[] = [];

    _write(chunk: any, encoding: string, callback: Function): void {
      this.data.push(chunk);
      this.emit("data", chunk.toString("UTF-8"));
    }
}

describe("Yago", () => {
  let yago: Yago;
  let output: NodeJS.WritableStream;

  beforeEach(() => {
    output = new MemoryStream();
    yago = new Yago(output);
  });

  it("should process first task", (done) => {
    yago.register(HelloWorldTaskRunner);
    yago.enqueue("hello-world");

    output.on("data", (data) => {
      expect(data).to.be.eq("Hello World");
      yago.stop();
      done();
    });

    yago.start();
  });

  it("should process task with payload", (done) => {
    yago.register(HelloWorldTaskRunner);
    yago.enqueue("hello-world", { payload: "Yago" });

    output.on("data", (data) => {
      yago.stop();
      expect(data).to.be.eq("Hello World: Yago");
      done();
    });

    yago.start();
  });
});