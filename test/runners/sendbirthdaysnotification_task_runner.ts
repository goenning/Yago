import {
  RunTask, TaskRunner,
  ExecutionResult, ExecutionResultOutcome,
  ExecutionContext
} from "../../src/task_runner";

@RunTask("send-birthdays-notification")
export class SendBirthdaysNotificationTaskRunner extends TaskRunner {
  async execute(ctx: ExecutionContext) {
    const birthdays = await this.getBirthdaysFor(ctx.task.payload.date, ctx.task.payload.month);
    ctx.logger.info(`Sending birthdays notifications for ${ctx.task.payload.date} / ${ctx.task.payload.month}`);
    return this.success();
  }

  async getBirthdaysFor(date: number, month: number) {
    return [
      { id: 1, name: "John", dob: new Date(1985, 4, 6) },
      { id: 2, name: "Mike", dob: new Date(1976, 5, 23) },
      { id: 3, name: "Bob", dob: new Date(1997, 4, 6) },
    ];
  }
}