import {
  RunTask, TaskRunner, ExecutionContext
} from "../../src/task_runner";

@RunTask("throw-error")
export class ThrowErrorTaskRunner extends TaskRunner {
  async execute(ctx: ExecutionContext) {
    throw new Error("Something happened...");
  }
}