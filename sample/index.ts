import { Yago } from "../src/yago";
import { TaskRunner, RedisTaskQueue, RunTask, ExecutionContext } from "../src";

@RunTask("greet")
class GreeterTaskRunner extends TaskRunner {
  async execute(ctx: ExecutionContext) {
    ctx.logger.info(`Greetings: ${ctx.task.payload} \n`);
    return this.success();
  }
}

const date = new Date(2016, 8, 24, 17, 36, 0);
const yago = new Yago();
yago.register(GreeterTaskRunner);
yago.schedule("* * * * * *", "greet", () => {
  return { payload: "Yago" };
});
yago.start();