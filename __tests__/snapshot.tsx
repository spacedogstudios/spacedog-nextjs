/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react";
import Home from "@/app/page";

it("renders homepage unchanged", async () => {
  const { container } = render(await Home());
  expect(container).toMatchSnapshot();
});
