import { ImageLoaderProps } from "next/image";

const normalizeSrc = (src: string) => {
  return src.startsWith("/") ? src.slice(1) : src;
};

export default function imageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  const params = `size:${width}:::` + (quality ? `/quality:${quality}` : "");

  return (
    process.env.NEXT_PUBLIC_IMAGE_SERVER +
    `/insecure/${params}/plain/local:///${normalizeSrc(src)}`
  );
}
