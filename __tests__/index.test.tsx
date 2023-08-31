/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("renders a main element", async () => {
    render(await Home());

    const main = screen.getByRole("main");

    expect(main).toBeInTheDocument();
  });
});
