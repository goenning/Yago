import { expect } from "chai";
import { HttpServer } from "../../src/server/http_server";
import { TaskQueue } from "../../src/server/task_queue";
import { TaskPriority } from "../../src/server/task";
import { InProcessTaskQueue } from "../../src/server/inprocess_task_queue";
import { TASK_NAME_REQUIRED } from "../../src/server/consts";
import { post } from "./helper/local_request";

describe("HTTP Server", () => {
  let server: HttpServer;
  let queue: TaskQueue;

  beforeEach(() => {
    queue = new InProcessTaskQueue();
    server = new HttpServer(queue);
    server.start(8888);
  });

  afterEach(() => {
    server.stop();
  });

  it("should queue task when using HTTP API", async () => {
    const result = await post("/api/enqueue", {
      name: "hello-world-via-api"
    });
    const count = await queue.count();
    expect(count).to.be.eq(1);
  });

  it("should return task id from HTTP API call", async () => {
    const result = await post("/api/enqueue", {
      name: "hello-world-via-api"
    });
    const task = await queue.dequeue();
    expect(task!.id).to.be.eq(result.body.id);
  });

  it("should queue task with custom properties", async () => {
    const result = await post("/api/enqueue", {
      name: "hello-world-via-api",
      priority: TaskPriority.High,
      payload: {
        name: "Maxx",
        age: 22
      }
    });
    const task = await queue.dequeue();
    expect(task!.id).to.be.eq(result.body.id);
    expect(task!.name).to.be.eq("hello-world-via-api");
    expect(task!.priority).to.be.eq(TaskPriority.High);
    expect(task!.payload).to.deep.equal({ name: "Maxx", age: 22 });
  });

  it("should return 404 when requesting unknown route", async () => {
    const result = await post("/api/dummy");
    expect(result.response.statusCode).to.be.eq(404);
  });

  it("should return 500 when something goes wrong", async () => {
    const data = { };
    const result = await post("/api/enqueue", data);
    expect(result.response.statusCode).to.be.eq(500);
    expect(result.body.error).to.be.eq(TASK_NAME_REQUIRED);
  });
});
