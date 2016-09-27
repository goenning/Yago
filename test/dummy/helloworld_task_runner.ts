import {
  RunTask, TaskRunner,
  ExecutionResult, ExecutionResultOutcome,
  ExecutionContext
} from "../../src/task_runner";

@RunTask("hello-world")
export class HelloWorldTaskRunner extends TaskRunner {
  async execute(ctx: ExecutionContext) {
    if (ctx.task.payload)
      ctx.logger.info(`Hello World: ${ctx.task.payload}`);
    else
      ctx.logger.info("Hello World");
    return this.success();
  }
}