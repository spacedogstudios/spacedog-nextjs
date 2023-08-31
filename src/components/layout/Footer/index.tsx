type Props = {
  className?: string,
}

const paragraphClassName = 'text-gray-400 flex-none text-sm sm:text-base';

export default function Footer({ className }: Props) {
  return (
    <footer className={`grid grid-cols-main (className}`}>
      <div className="col-gutter flex flex-row flex-wrap py-8 justify-center gap-x-12 gap-y-4 sm:gap-x-24">
        <p className={paragraphClassName}>© Space Dog Studios</p>
        <p className={paragraphClassName}>Design inspired by <a href="https://www.colorlib.com/">Colorlib</a></p>
      </div>
    </footer>
  )
}
