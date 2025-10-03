"use client";

import { useEffect, useRef } from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export default function ShinyText({
  text,
  disabled = false,
  speed = 3,
  className = "",
}: ShinyTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (disabled || !ref.current) return;

    const element = ref.current;
    element.style.backgroundSize = "200% auto";
    element.style.backgroundImage =
      "linear-gradient(to right, #7C3AED 0%, #A78BFA 50%, #7C3AED 100%)";
    element.style.webkitBackgroundClip = "text";
    element.style.backgroundClip = "text";
    element.style.webkitTextFillColor = "transparent";
    element.style.animation = `shine ${speed}s linear infinite`;
  }, [disabled, speed]);

  return (
    <span ref={ref} className={`animate-shine ${className}`}>
      {text}
    </span>
  );
}

