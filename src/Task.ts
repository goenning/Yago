export interface TaskOptions {
  priority?: TaskPriority;
  startAt?: Date;
}

export class Task {
  private name: string;
  private priority: TaskPriority;
  private startAt: Date;

  constructor(name: string, options?: TaskOptions) {
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
      name: this.name,
      priority: this.priority,
      startAt: this.startAt
    });
  }
}

export enum TaskPriority {
    VeryHigh = 1,
    High = 2,
    Normal = 3,
    Low = 4,
    VeryLow = 5
}