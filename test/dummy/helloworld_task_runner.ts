import {
  RunTask, TaskRunner,
  ExecutionResult, ExecutionResultOutcome,
  ExecutionContext
} from "../../src/task_runner";

@RunTask("hello-world")
export class HelloWorldTaskRunner extends TaskRunner {
  async execute(ctx: ExecutionContext) {
    if (ctx.task.payload)
      ctx.output.write(`Hello World: ${ctx.task.payload}`);
    else
      ctx.output.write("Hello World");
    return new ExecutionResult(ExecutionResultOutcome.Success);
  }
}