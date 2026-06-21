"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

function hasSiteHistory(): boolean {
  try {
    return !!window.history.state?.__NA;
  } catch {
    return false;
  }
}

interface BackButtonProps {
  fallbackHref?: string;
  label?: string;
}

export function BackButton({
  fallbackHref = "/",
  label = "Back",
}: BackButtonProps) {
  const router = useRouter();
  const [visible, setVisible] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const update = () => {
      const menuOpen = document.body.classList.contains("modal-open");
      setVisible(window.scrollY < 100 && !menuOpen);
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);

  const handleBack = () => {
    if (canGoBack) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      onClick={handleBack}
      aria-label="Go back"
      className={`
        fixed left-6 z-40 flex items-center gap-2.5
        px-5 py-2.5 rounded-full
        border border-white/10
        bg-[rgba(10,9,8,0.45)]
        backdrop-blur-md
        text-[var(--brand-cream)]
        hover:text-white
        hover:border-[var(--gold)]
        hover:bg-[rgba(10,9,8,0.85)]
        transition-all duration-300
        font-jost text-[0.65rem]
        tracking-[0.2em] uppercase
      `}
      style={{
        top: "calc(var(--nav-height) + 14px)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <ArrowLeft size={12} strokeWidth={2} />
      <span>{label}</span>
    </button>
  );
}
