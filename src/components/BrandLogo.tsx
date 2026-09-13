import logoText from '../assets/logo-text.png';

interface BrandLogoProps {
  compact?: boolean;
  className?: string;
}

export default function BrandLogo({ compact = false, className = '' }: BrandLogoProps) {
  return (
    <img
      src={logoText}
      alt="Dev Stack"
      className={`${compact ? 'h-7' : 'h-8'} w-auto ${className}`}
    />
  );
}
