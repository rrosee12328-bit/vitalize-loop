import logoSrc from "@/assets/vektiss-logo.png";

type LogoProps = {
  /** "dark" = for light backgrounds (black text). "light" = for dark backgrounds (inverted to white text). */
  variant?: "dark" | "light";
  className?: string;
};

export function VektissLogo({ variant = "dark", className }: LogoProps) {
  return (
    <img
      src={logoSrc}
      alt="Vektiss"
      className={className}
      style={
        variant === "light"
          ? { filter: "brightness(0) invert(1)" }
          : undefined
      }
    />
  );
}
