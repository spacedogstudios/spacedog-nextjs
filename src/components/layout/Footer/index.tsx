import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

export default function Footer({
  className,
}: ComponentPropsWithoutRef<"footer">) {
  const containerClassName = "grid grid-cols-small md:grid-cols-main";
  const paragraphClass = "text-gray-400 flex-none text-sm sm:text-base";

  return (
    <footer className={cn(containerClassName, className)}>
      <div className="col-gutter flex flex-row flex-wrap py-8 justify-center gap-x-12 gap-y-4 sm:gap-x-24">
        <p className={paragraphClass}>© Space Dog Studios</p>
      </div>
    </footer>
  );
}
