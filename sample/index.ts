import { TaskRunner, RunTask, ExecutionContext, ExecutionResult, ExecutionResultOutcome } from "../src";
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
yago.schedule("* * * * * *", "greet", () => {
  return { payload: "Yago" };
});
yago.start();