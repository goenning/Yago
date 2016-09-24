import { Task } from "./task";

export const DEFAULT_RETRY_COUNT = 3;

export function RunTask(taskName: string) {
    return function (target: ITaskRunnerClass) {
       target.taskName = taskName;
    };
}

export class ExecutionResult {
  constructor(public outcome: ExecutionResultOutcome) {
  }
}

export class ExecutionContext {
  constructor(public task: Task, public output: NodeJS.WritableStream) {
  }
}

export interface ITaskRunnerClass {
  new (): TaskRunner;
  taskName?: string;
}

export enum ExecutionResultOutcome {
  Unknown = 0,
  Success = 1,
  Failure = 2,
  Ignored = 3
}

export abstract class TaskRunner {
  abstract execute(ctx: ExecutionContext): Promise<ExecutionResult>;
  retryCount(): number {
    return DEFAULT_RETRY_COUNT;
  }
  success(): ExecutionResult {
    return new ExecutionResult(ExecutionResultOutcome.Success);
  }
}