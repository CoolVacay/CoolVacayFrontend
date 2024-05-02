import Image from "next/image";
import type { ImageProps } from "next/image";

interface IconGeneratorProps extends Omit<ImageProps, 'height' | 'width'> {
  src: string;
  width: string;
  alt: string;
  className?: string;
};

const IconGenerator = ({
  src,
  width,
  alt,
  className,
  ...rest
}: IconGeneratorProps) => {
  return (
    <Image
      alt={alt}
      src={src}
      width={0}
      height={0}
      className={className}
      style={{ width: width, height: "auto" }}
      {...rest}
    />
  );
};

export default IconGenerator;
