import { v4 } from "node-uuid";

export interface TaskOptions {
  priority?: TaskPriority;
  startAt?: Date;
}

export class Task {
  public name: string;
  public priority: TaskPriority;
  public id: string;
  public startAt: Date;

  constructor(name: string, options?: TaskOptions) {
    this.id = v4();
    this.name = name;
    this.priority = options && options.priority ? options.priority : TaskPriority.Normal;
    this.startAt = options && options.startAt ? options.startAt : null;
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
      startAt: this.startAt
    });
  }

  static fromJson(input: string): Task {
    const json = JSON.parse(input);
    const task = new Task(json.name, {
      priority: json.priority,
      startAt: json.startAt ? new Date(json.startAt) : null
    });
    task.id = json.id;
    return task;
  }
}

export enum TaskPriority {
    VeryHigh = 1,
    High = 2,
    Normal = 3,
    Low = 4,
    VeryLow = 5
}