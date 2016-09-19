export class ExecutionResult {

}

export class ExecutionContext {
  output: NodeJS.WritableStream;
}

export abstract class TaskRunner {
  abstract execute(ctx: ExecutionContext): ExecutionResult;
}