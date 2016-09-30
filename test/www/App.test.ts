import { App } from "../../src/www/components/App"
import { expect } from "chai";

describe("App Test", () => {
  it("should start with default state", () => {
    const app = new App();
    expect(app.state.value).to.be.eq("123");
  })
});