// test for container component
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Container } from "./container";

describe("Container", () => {
  it("should render successfully", async () => {
    render(<Container>Test</Container>);
    expect(await screen.findByText("Test")).toBeTruthy();
  });

  it("should render with props", async () => {
    render(<Container className="">Test</Container>);
    expect(await screen.findByText("Test")).toBeTruthy();
  });
});
