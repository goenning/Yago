import { Logger } from "./";

export class StandardLogger implements Logger {
  private readonly output: NodeJS.WritableStream;
  constructor(output: NodeJS.WritableStream) {
    this.output = output;
  }

  private date(): string {
    return `${new Date().toISOString()}`;
  }

  info(message: string): void {
    this.output.write(`[${this.date()}] [INFO] ${message}`);
  }

  warn(message: string): void {
    this.output.write(`[${this.date()}] [WARN] ${message}`);
  }

  error(err: string|Error): void {
    if (typeof err === "string")
      this.output.write(`[${this.date()}] [ERROR] ${err}`);
    else
      this.output.write(`[${this.date()}] [ERROR] ${err.toString()}\n${err.stack}`);
  }
}