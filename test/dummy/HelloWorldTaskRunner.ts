import { TaskRunner, ExecutionContext, ExecutionResult } from "../../src/TaskRunner";

export class HelloWorldTaskRunner extends TaskRunner {
  execute(ctx: ExecutionContext): ExecutionResult {
    ctx.output.write("Hello World");
    return null;
  }
}