/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("homepage accessibility", () => {
  beforeEach(async () => {
    render(await Home());
  });

  it("has exactly one h1", () => {
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("gives the mobile menu button an accessible name", () => {
    expect(screen.getByRole("button", { name: "Menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("uses plain navigation links rather than menu roles", () => {
    expect(screen.queryByRole("menubar")).not.toBeInTheDocument();
    expect(screen.queryByRole("menuitem")).not.toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Contact" }).length).toBe(1);
  });
});
