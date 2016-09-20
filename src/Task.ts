import { v4 } from "node-uuid";

export interface TaskOptions {
  priority?: TaskPriority;
  startAt?: Date;
  payload?: any;
}

export enum TaskPriority {
    VeryHigh = 1,
    High = 2,
    Normal = 3,
    Low = 4,
    VeryLow = 5
}

function isFunction(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
};

export class Task {
  public name: string;
  public priority: TaskPriority;
  public id: string;
  public startAt: Date;
  public payload: any;

  constructor(name: string, options?: TaskOptions | (() => TaskOptions)) {

    this.id = v4();
    this.name = name;
    let opt: TaskOptions = (typeof options === "function" ? options() : options) || { };

    this.priority = opt.priority ? opt.priority : TaskPriority.Normal;
    this.startAt = opt.startAt ? opt.startAt : null;
    this.payload = opt.payload ? opt.payload : null;
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

  static fromJson(input: string): Task {
    const json = JSON.parse(input);
    const task = new Task(json.name, {
      priority: json.priority,
      startAt: json.startAt ? new Date(json.startAt) : null,
      payload: json.payload
    });
    task.id = json.id;
    return task;
  }
}