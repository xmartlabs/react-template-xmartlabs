import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { App } from "app";

describe("App", () => {
  it("should render correctly", () => {
    expect(() => render(<App />)).not.toThrow();
  });
});
