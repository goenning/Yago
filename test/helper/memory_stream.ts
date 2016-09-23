import { Writable, WritableOptions } from "stream";

export class MemoryStream extends Writable {
  constructor(opts?: WritableOptions) {
    super(opts);
  }

  _write(chunk: any, encoding: string, callback: Function): void {
    this.emit("data", chunk.toString("UTF-8"));
    callback();
  }
}