import { Task, TaskPriority } from "../src/task";
import { expect } from "chai";

const helloWorldTask = new Task("hello-world");
const helloWorldTypeScriptTask = new Task("hello-world", () => {
  return {
    payload: "TypeScript"
  };
});
const welcomeMessageTask = new Task("welcome-message", { priority: TaskPriority.VeryHigh });
const assignmentReminderTask = new Task("assignment-reminder", {
  startAt: new Date(Date.UTC(2016, 12, 10, 15, 10, 12)),
  priority: TaskPriority.VeryHigh,
  payload: {
    with: "CEO",
    where: "Blue Meeting Room"
  }
});
const processDailySalesTask = new Task("process-daily-sales", () => {
  return {
    startAt: new Date(Date.UTC(2016, 12, 10, 15, 10, 12)),
    priority: TaskPriority.VeryLow
  };
});

const all = [
  {
    name: "helloWorldTask",
    task: helloWorldTask,
    score: 3,
    json: `{\"id\":\"${helloWorldTask.id}\",\"name\":\"hello-world\",\"priority\":3}`
  },
  {
    name: "helloWorldTypeScriptTask",
    task: helloWorldTypeScriptTask,
    score: 3,
    json: `{\"id\":\"${helloWorldTypeScriptTask.id}\",\"name\":\"hello-world\",\"priority\":3,"payload":\"TypeScript\"}`
  },
  {
    name: "welcomeMessageTask",
    task: welcomeMessageTask,
    score: 1,
    json: `{\"id\":\"${welcomeMessageTask.id}\",\"name\":\"welcome-message\",\"priority\":1}`
  },
  {
    name: "assignmentReminderTask",
    task: assignmentReminderTask,
    score: 1484061012001,
    json: `{\"id\":\"${assignmentReminderTask.id}\",\"name\":\"assignment-reminder\",\"priority\":1,\"startAt\":\"2017-01-10T15:10:12.000Z\",\"payload\":{\"with"\:\"CEO\",\"where\":\"Blue Meeting Room\"}}`
  },
  {
    name: "processDailySalesTask",
    task: processDailySalesTask,
    score: 1484061012005,
    json: `{\"id\":\"${processDailySalesTask.id}\",\"name\":\"process-daily-sales\",\"priority\":5,\"startAt\":\"2017-01-10T15:10:12.000Z\"}`
  }
];

describe("Task", () => {
  all.forEach((item) => {
    it(`${item.name} should have a valid UUID v4`, () => {
      expect(item.task.id.length).to.be.eq(36);
      expect(item.task.id[14]).to.be.eq("4");
    });

    it(`${item.name} should have a score of ${item.score}`, () => {
      expect(item.task.getScore()).to.be.eq(item.score);
    });

    it(`${item.name} should convert to json ${item.json}`, () => {
      expect(item.task.toJson()).to.be.eq(item.json);
    });

    it(`${item.json} should be parsed to same task as ${item.name}`, () => {
      expect(Task.fromJson(item.json)).to.deep.equal(item.task);
    });
  });

  it("assignmentReminderTask should have lower score than processDailySalesTask", () => {
    expect(assignmentReminderTask.getScore()).to.be.below(processDailySalesTask.getScore());
  });
});
