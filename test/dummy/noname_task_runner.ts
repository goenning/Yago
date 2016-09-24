import {
  TaskRunner,
  ExecutionResult, ExecutionResultOutcome,
  ExecutionContext
} from "../../src/task_runner";

export class NoNameTaskRunner extends TaskRunner {
  async execute(ctx: ExecutionContext) {
    return new ExecutionResult(ExecutionResultOutcome.Success);
  }
}