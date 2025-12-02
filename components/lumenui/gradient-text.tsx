"use client";

type Props = {
  text: string;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  padding?: string;
  radius?: string;
};

export default function GradientText({
  text = "LUMEN UI COMPONENTS",
  className = "",
  colors = ["#d9b338ff", "#ac68f5ff", "#40ff99ff"],
  animationSpeed = 10,
  showBorder = false,
  padding = "px-6 py-2",
  radius = "1.25rem"
}: Props) {
  const gradient = `linear-gradient(to right, ${colors.join(", ")})`;

  const styleGradient = {
    backgroundImage: gradient,
    backgroundSize: "300% 100%",
    animation: `gradientMove ${animationSpeed}s linear infinite`,
  };

  return (
    <div
      className={`relative mx-auto flex max-w-fit items-center text-4xl font-montserrat font-semibold justify-center  backdrop-blur transition-shadow overflow-hidden cursor-pointer ${padding} ${className}`}
      style={{ borderRadius: radius }}
      role="text"
      aria-label={text}
    >
      {showBorder && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            ...styleGradient,
            borderRadius: radius,
            padding: "2px",
          }}
        >
          <div
            className="w-full h-full bg-black"
            style={{ borderRadius: radius }}
          />
        </div>
      )}

      <div
        className="relative text-transparent bg-clip-text"
        style={styleGradient}
      >
        {text}
      </div>

      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
