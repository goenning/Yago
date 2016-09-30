import { Logger } from "../../../src/server/logger";
import { EventEmitter } from "events";

export class MemoryLogger extends EventEmitter implements Logger {

  info(message: string): void {
    this.emit("data", message);
  }

  warn(message: string): void {
    this.emit("data", message);
  }

  error(err: string | Error): void {
    this.emit("data", err);
  }
}