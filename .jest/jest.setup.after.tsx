// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { ImgHTMLAttributes } from "react";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => {
    const { alt, src, width, height } = props;
    return <img alt={alt} src={src} width={width} height={height} />;
  },
}));

jest.mock("../src/lib/parseContent");
