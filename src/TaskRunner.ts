import { Task } from "./Task";

export class ExecutionResult {

}

export class ExecutionContext {
  constructor(public task: Task, public output: NodeJS.WritableStream) {
  }
}

export abstract class TaskRunner {
  abstract execute(ctx: ExecutionContext): Promise<ExecutionResult>;
}