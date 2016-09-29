import * as express from "express";
import { Server } from "http";
import * as bodyParser from "body-parser";
import { TaskQueue } from "./task_queue";
import { Task } from "./task";

export class HttpServer {
  private app: express.Express;
  private server: Server;

  constructor(queue: TaskQueue) {
    this.app = express();
    this.app.use(bodyParser.json());

    this.app.post("/api/enqueue", async (req, res, next) => {
      try {
        const task = await queue.enqueue(Task.fromJson(req.body));
        res.json({ id: task.id });
      } catch (err) {
        next(err);
      }
    });

    this.app.use(async (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.status(500).json({ status: 500, error: err.message });
    });
  }

  start(port: number): void {
    this.server = this.app.listen(port);
  }

  stop(): void {
    if (this.server)
      this.server.close();
  }
}