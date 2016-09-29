import { v4 } from "node-uuid";
import { TASK_NAME_REQUIRED } from "./consts";

export interface TaskOptions {
  priority?: TaskPriority;
  startAt?: Date | undefined;
  payload?: any;
}

export enum TaskPriority {
    VeryHigh = 1,
    High = 2,
    Normal = 3,
    Low = 4,
    VeryLow = 5
}

export class Task {
  public name: string;
  public priority: TaskPriority;
  public id: string;
  public startAt: Date | undefined;
  public payload: any;

  constructor(name: string, options?: TaskOptions | (() => TaskOptions)) {
    if (!name)
      throw new Error(TASK_NAME_REQUIRED);

    this.id = v4();
    this.name = name;
    let opt: TaskOptions = (typeof options === "function" ? options() : options) || { };

    this.priority = opt.priority ? opt.priority : TaskPriority.Normal;
    this.startAt = opt.startAt ? opt.startAt : undefined;
    this.payload = opt.payload ? opt.payload : undefined;
  }

  getScore(): number {
    if (this.startAt)
      return this.startAt.getTime() + this.priority.valueOf();
    return this.priority.valueOf();
  }

  toJson(): string {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      priority: this.priority,
      startAt: this.startAt,
      payload: this.payload
    });
  }

  static fromJson(input: string | {}): Task {
    const json = typeof input === "string" ? JSON.parse(input) : input;
    const task = new Task(json.name, {
      priority: json.priority,
      startAt: json.startAt ? new Date(json.startAt) : undefined,
      payload: json.payload
    });
    task.id = json.id || v4();
    return task;
  }
}