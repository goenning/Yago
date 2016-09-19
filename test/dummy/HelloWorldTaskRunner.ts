import { TaskRunner, ExecutionContext, ExecutionResult } from "../../src/TaskRunner";

export class HelloWorldTaskRunner extends TaskRunner {
  async execute(ctx: ExecutionContext): Promise<ExecutionResult> {
    if (ctx.task.payload)
      ctx.output.write(`Hello World: ${ctx.task.payload}`);
    else
      ctx.output.write("Hello World");
    return null;
  }
}