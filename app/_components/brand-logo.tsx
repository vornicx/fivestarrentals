import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export default function BrandLogo({ className = "", priority = false }: BrandLogoProps) {
  return (
    <Image
      className={`brand-logo ${className}`.trim()}
      src="/five-star-rentals-logo.svg"
      alt="Five Star Rentals"
      width={259}
      height={46}
      priority={priority}
    />
  );
}
