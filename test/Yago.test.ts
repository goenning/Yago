import { expect } from "chai";
import { Task } from "../src/Task";
import { Yago } from "../src/Yago";
import { HelloWorldTaskRunner } from "./dummy/HelloWorldTaskRunner";

describe("Yago", () => {
  let yago: Yago;
  beforeEach(() => {
    yago = new Yago();
  });

  it.only("should process first task", async () => {
    yago.register(HelloWorldTaskRunner);
    yago.enqueue(new Task("hello-world"));
    yago.start();
  });
});