import { TaskRunner, RunTask, ExecutionContext, ExecutionResult, ExecutionResultOutcome } from "../src/TaskRunner";
import { Yago } from "../src/Yago";

@RunTask("greet")
class GreeterTaskRunner implements TaskRunner {
  async execute(ctx: ExecutionContext) {
    ctx.output.write(`Greetings: ${ctx.task.payload} \n`);
    return new ExecutionResult(ExecutionResultOutcome.Success);
  }
}

const yago = new Yago();
yago.register(GreeterTaskRunner);
yago.schedule("* * * * * *", "greet", { 
  payload: () => {
    return "Yago";
  } 
});
yago.start();