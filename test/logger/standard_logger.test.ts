import { Logger } from "../../src/logger";
import { StandardLogger } from "../../src/logger/standard_logger";
import { MemoryStream } from "../helper/memory_stream";
import { expect } from "chai";
import * as sinon from "sinon";

describe("Standard Logger", () => {
  let output: NodeJS.WritableStream;
  let logger: Logger;
  let sandbox: sinon.SinonSandbox;
  let clock: sinon.SinonFakeTimers;
  const now = new Date(Date.UTC(2010, 10, 2, 14, 43, 12, 234));
  
  beforeEach(() => {
    output = new MemoryStream();
    logger = new StandardLogger(output);
    sandbox = sinon.sandbox.create();
    clock = sinon.useFakeTimers(now.getTime());
  });

  afterEach(() => {
    sandbox.restore();
    clock.restore();
  });

  it(`should log INFO`, (done) => {
    output.on("data", (data: string) => {
      expect(data).to.be.eq("[2010-11-02T14:43:12.234Z] [INFO] Hello World");
      done();
    });
    logger.info("Hello World");
  });

  it(`should log WARN`, (done) => {
    output.on("data", (data: string) => {
      expect(data).to.be.eq("[2010-11-02T14:43:12.234Z] [WARN] Caution...");
      done();
    });
    logger.warn("Caution...");
  });

  it(`should log ERROR as string`, (done) => {
    output.on("data", (data: string) => {
      expect(data).to.be.eq("[2010-11-02T14:43:12.234Z] [ERROR] Something is broken...");
      done();
    });
    logger.error("Something is broken...");
  });

  it(`should include stacktrace when logging an Error object`, (done) => {
    const err = new Error("Something is broken...");
    output.on("data", (data: string) => {
      expect(data).to.be.eq(`[2010-11-02T14:43:12.234Z] [ERROR] Error: Something is broken...\n${err.stack}`);
      done();
    });
    logger.error(err);
  });
});