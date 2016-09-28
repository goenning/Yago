import { expect } from "chai";
import { ApiServer } from "../src/api_server";
import { TaskQueue } from "../src/task_queue";
import { TaskPriority } from "../src/task";
import { InProcessTaskQueue } from "../src/inprocess_task_queue";
import * as msg from "../src/messages";
import * as request from "request";

describe("API Server", () => {
  let server: ApiServer;
  let queue: TaskQueue;

  beforeEach(() => {
    queue = new InProcessTaskQueue();
    server = new ApiServer(queue);
    server.start(8888);
  });

  afterEach(() => {
    server.stop();
  });

  it("should queue task when using HTTP API", (done) => {
    const data = {
      name: "hello-world-via-api"
    };
    request.post("http://localhost:8888/api/enqueue", { json: data }, () => {
      queue.count().then((count) => {
        expect(count).to.be.eq(1);
        done();
      }).catch(done);
    });
  });

  it("should return task id from HTTP API call", (done) => {
    const data = {
      name: "hello-world-via-api"
    };
    request.post("http://localhost:8888/api/enqueue", { json: data }, (err, res, body) => {
      queue.dequeue().then((task) => {
        expect(task!.id).to.be.eq(body.id);
        done();
      }).catch(done);
    });
  });

  it("should queue task with custom properties", (done) => {
    const data = {
      name: "hello-world-via-api",
      priority: TaskPriority.High,
      payload: {
        name: "Maxx",
        age: 22
      }
    };
    request.post("http://localhost:8888/api/enqueue", { json: data }, (err, res, body) => {
      queue.dequeue().then((task) => {
        expect(task!.id).to.be.eq(body.id);
        expect(task!.name).to.be.eq(data.name);
        expect(task!.priority).to.be.eq(data.priority);
        expect(task!.payload).to.deep.equal(data.payload);
        done();
      }).catch(done);
    });
  });

  it("should return 404 when requesting unknown route", (done) => {
    request.post("http://localhost:8888/api/dummy", { }, (err, res, body) => {
      expect(res.statusCode).to.be.eq(404);
      done();
    });
  });

  it("should return 500 when something goes wrong", (done) => {
    const data = { };
    request.post("http://localhost:8888/api/enqueue", { json: data }, (err, res, body) => {
      expect(res.statusCode).to.be.eq(500);
      expect(body.error).to.be.eq(msg.TASK_NAME_REQUIRED);
      done();
    });
  });
});
