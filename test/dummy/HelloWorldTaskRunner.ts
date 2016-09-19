import { Task, TaskRunner, ITaskRunnerClass, ExecutionContext } from "../../src/TaskRunner";


@Task("hello-world")
export class HelloWorldTaskRunner extends TaskRunner {
  async execute(ctx: ExecutionContext) {
    if (ctx.task.payload)
      ctx.output.write(`Hello World: ${ctx.task.payload}`);
    else
      ctx.output.write("Hello World");
    return this.success();
  }
}