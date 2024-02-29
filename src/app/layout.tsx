import "./globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import SmoothScrolling from "@/components/helpers/SmoothScrolling";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "500"],
});

export const metadata: Metadata = {
  title: "Space Dog Studios",
  description:
    "We are a small app and web development team based in Melbourne. " +
    "We work with all businesses large and small to to produce tailored solutions of the highest quality. " +
    "We have everything you need to meet all your app and web development needs.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const bodyClass = `bg-neutral-800 neutral-500 ${montserrat.className}`;

  return (
    <html lang="en">
      <body className={bodyClass}>
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}
