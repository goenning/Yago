import { RunTask, TaskRunner, ITaskRunnerClass, ExecutionResult, ExecutionResultOutcome, ExecutionContext } from "../../src/TaskRunner";

@RunTask("hello-world")
export class HelloWorldTaskRunner implements TaskRunner {
  async execute(ctx: ExecutionContext) {
    if (ctx.task.payload)
      ctx.output.write(`Hello World: ${ctx.task.payload}`);
    else
      ctx.output.write("Hello World");
    return new ExecutionResult(ExecutionResultOutcome.Success);
  }
}