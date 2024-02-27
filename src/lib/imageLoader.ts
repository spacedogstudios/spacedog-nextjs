import { ImageLoaderProps } from "next/image";

const normalizeSrc = (src: string) => {
  return src.startsWith("/") ? src.slice(1) : src;
};

export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  const params = [`width=${width}`];
  if (quality) {
    params.push(`quality=${quality}`);
  }
  const paramsString = params.join(",");
  const imageTransformUrl = process.env.IMAGE_TRANSFORM_URL ?? "";
  return `${imageTransformUrl}/cdn-cgi/image/${paramsString}/${process.env.IMAGE_SOURCE_URL}/${normalizeSrc(src)}`;
}
