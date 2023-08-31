// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import {ReactElement} from "react";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any): ReactElement => {
    return <img {...props} />;
  },
}));

jest.mock("../src/lib/parseContent");
