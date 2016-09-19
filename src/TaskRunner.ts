import { Task } from "./Task";

export function Task(taskName: string) {
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
  Failure = 2
}

export abstract class TaskRunner {
  abstract execute(ctx: ExecutionContext): Promise<ExecutionResult>;
  success(): ExecutionResult {
    return new ExecutionResult(ExecutionResultOutcome.Success);
  }
}