// test for container component
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Container } from "./container";

describe("Container", () => {
  it("should render successfully", async () => {
    const el = render(<Container>Test</Container>);
    expect(await el.findByText("Test")).toBeTruthy();
  });

  it("should render with props", async () => {
    const el = render(<Container className="">Test</Container>);
    expect(await el.findByText("Test")).toBeTruthy();
  });
});
