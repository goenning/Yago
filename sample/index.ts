import { TaskRunner, RunTask, ExecutionContext, ExecutionResult, ExecutionResultOutcome } from "../src";
import { Yago } from "../src/yago";

@RunTask("greet")
class GreeterTaskRunner extends TaskRunner {
  async execute(ctx: ExecutionContext) {
    ctx.output.write(`Greetings: ${ctx.task.payload} \n`);
    return new ExecutionResult(ExecutionResultOutcome.Success);
  }
}

const date = new Date(2016, 8, 24, 17, 36, 0);

const yago = new Yago();
yago.register(GreeterTaskRunner);
yago.schedule("* * * * * *", "greet", () => {
  return { payload: "Yago" };
});
yago.enqueue("greet", { startAt: date, payload: "Yagoooo" });
yago.start();