/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import Section from "@/components/layout/Section";
import Home from "@/app/page";

it("doesn't render 'null' for a missing tagline", () => {
  render(<Section id="about" subheading="Hello There" tagline={null} />);

  expect(screen.getByText("Hello There")).toBeInTheDocument();
  expect(screen.queryByText("null")).not.toBeInTheDocument();
});

it("fails instead of rendering a blank page when there's no content", async () => {
  const { DB } = getCloudflareContext().env;
  await DB.prepare("DELETE FROM content").run();

  await expect(Home()).rejects.toThrow("No content found");
});
