import { tv } from "tailwind-variants";

type Props = {
  className?: string;
};

const containerClass = tv({ base: "grid grid-cols-small md:grid-cols-main" });
const paragraphClass = "text-gray-400 flex-none text-sm sm:text-base";

export default function Footer({ className }: Props) {
  const tvOptions = className ? { class: className } : {};

  return (
    <footer className={containerClass(tvOptions)}>
      <div className="col-gutter flex flex-row flex-wrap py-8 justify-center gap-x-12 gap-y-4 sm:gap-x-24">
        <p className={paragraphClass}>© Space Dog Studios</p>
        <p className={paragraphClass}>
          Design inspired by <a href="https://www.colorlib.com/">Colorlib</a>
        </p>
      </div>
    </footer>
  );
}
