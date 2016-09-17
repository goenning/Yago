export class Task {
  getScore(): number {
    return 1;
  }

  toJson(): string {
    return JSON.stringify({ name: "dummy" });
  }
}