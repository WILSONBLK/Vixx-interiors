"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { animate, stagger } from "animejs";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/data";
import {
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/ui/SocialIcons";
import { useTheme } from "@/hooks/useTheme";

const SPRING = { type: "spring" as const, stiffness: 320, damping: 24 };


function SocialIcon({ id, size = 16 }: { id: string; size?: number }) {
  if (id === "instagram") return <InstagramIcon size={size} />;
  if (id === "tiktok") return <TikTokIcon size={size} />;
  if (id === "whatsapp") return <WhatsAppIcon size={size} />;
  return null;
}

function GlowText({
  children,
  active = false,
  className,
  style,
}: {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const goldGlow =
    "0 0 24px rgba(196,154,46,0.95), 0 0 48px rgba(196,154,46,0.55), 0 0 80px rgba(196,154,46,0.25)";
  const creamGlow =
    "0 0 20px rgba(240,235,225,0.55), 0 0 40px rgba(240,235,225,0.25)";

  return (
    <motion.span
      className={className}
      style={style}
      whileHover={{
        textShadow: active ? goldGlow : creamGlow,
        color: active ? "rgba(212,175,55,1)" : "rgba(240,235,225,1)",
        transition: SPRING,
      }}
      whileTap={{
        textShadow: goldGlow,
        color: "rgba(212,175,55,1)",
        scale: 0.97,
        transition: SPRING,
      }}
    >
      {children}
    </motion.span>
  );
}

/**
 * Returns CSS transition styles for smooth hide/show of nav elements.
 * @param visible  Whether the element should be visible
 * @param delay    Stagger delay in milliseconds (for staged reveal)
 */
function slideStyle(visible: boolean, delay = 0): React.CSSProperties {
  const ease = "cubic-bezier(0.4, 0, 0.2, 1)";
  const dur = visible ? "0.38s" : "0.30s";
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0px)" : "translateY(-7px)",
    transition: `opacity ${dur} ${ease} ${delay}ms, transform ${dur} ${ease} ${delay}ms`,
    pointerEvents: visible ? undefined : "none",
  };
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { isDark, toggleTheme, mounted } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuEverOpened = useRef(false);

  /* ── Scroll visibility: hide on scroll-down, show on scroll-up ──────────
   * Works on every page. No hero detection — purely direction based.
   * atTop: true when < 60 px from the top (no backdrop needed there).
   * ──────────────────────────────────────────────────────────────────────── */
  const [navVisible, setNavVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const animationRef = useRef<any>(null);
  const openRef = useRef(false);
  useEffect(() => { openRef.current = open; }, [open]);
  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;

    // Set correct state immediately without waiting for a scroll event
    setAtTop(lastY < 60);
    if (lastY >= 60) setNavVisible(false);

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setAtTop(y < 60);

        if (y < 60) {
          setNavVisible(true); // always show at the very top
        } else if (y < lastY) {
          setNavVisible(true); // scrolling up → reveal
        } else if (y > lastY) {
          setNavVisible(false); // scrolling down → hide
        }

        lastY = y;
        raf = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("modal-open", open);
    return () => document.body.classList.remove("modal-open");  
  }, [open]);

  /* anime.js: open/close the full-screen overlay */
  useEffect(() => {
    const overlay = menuRef.current;
    if (!overlay) return;
    animationRef.current?.pause?.();

    if (open) {
      menuEverOpened.current = true;
      overlay.style.display = "flex";

      animationRef.current = animate(overlay, {
        opacity: [0, 1],
        translateY: [-16, 0],
        duration: 480,
        ease: "outExpo",
      });

      const items = overlay.querySelectorAll<HTMLElement>("[data-menu-item]");
      animationRef.current = animate(items, {
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 400,
        delay: stagger(60, { start: 90 }),
        ease: "outExpo",
      });
    } else {
      // Skip the close animation on the initial mount — the overlay starts
      // hidden already and running the animation would flicker it visible.
      if (!menuEverOpened.current) return;
      animate(overlay, {
        opacity: [1, 0],
        translateY: [0, -10],
        duration: 280,
        ease: "inQuad",
        onComplete: () => { if (!openRef.current) overlay.style.display = "none"; },
      });
    }
  }, [open]);

  /* Escape key */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* Focus trap */
  useEffect(() => {
    if (!open || !menuRef.current) return;
    const focusable = menuRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    first?.focus();
    window.addEventListener("keydown", trap);
    return () => window.removeEventListener("keydown", trap);
  }, [open]);

  /* The /start page is a standalone full-screen flow with its own header */
  if (pathname === "/start") return null;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  /* Show backdrop when nav is visible but not at the very top of the page */
  const showBackground = !atTop && navVisible;

  return (
    <>
      <header
        role="banner"
        className="fixed top-0 inset-x-0 z-50"
        style={{
          height: "var(--nav-height)",
          backgroundColor: showBackground
            ? "var(--bg-nav-scrolled)"
            : "transparent",
          backdropFilter: showBackground ? "blur(14px) saturate(130%)" : "none",
          WebkitBackdropFilter: showBackground
            ? "blur(14px) saturate(130%)"
            : "none",
          boxShadow: showBackground ? "var(--shadow-nav)" : "none",
          transition:
            "background-color 0.42s ease, backdrop-filter 0.42s ease, box-shadow 0.42s ease",
          // When hidden the header is transparent but still sits at z-50 and
          // would silently intercept every tap/click in the top 76px of the
          // viewport. Disabling pointer-events on the element itself prevents
          // that while keeping the children inert via slideStyle().
          pointerEvents: navVisible ? undefined : "none",
        }}
      >
        <nav
          className="w-full h-full flex items-center px-4 sm:px-6 xl:px-8"
          aria-label="Primary navigation"
        >
          {/* ── Logo — animated hide/show ──────────────────────────────────── */}
          <div className="flex-shrink-0 z-10" style={slideStyle(navVisible, 0)}>
            <Link
              href="/"
              className="flex items-center"
              aria-label="VIXX Interiors – Home"
              data-cursor="hover"
            >
              <Image
                src="/logo-gold.png"
                alt="VIXX Interiors"
                width={260}
                height={84}
                className="h-14 xl:h-[4.5rem] object-contain"
                style={{ width: 'auto' }}
                priority
              />
            </Link>
          </div>

          {/* Desktop nav links — always visible, fills remaining space */}
          <ul
            className="hidden lg:flex flex-1 items-center justify-center gap-6 2xl:gap-10 min-w-0 overflow-hidden"
            role="list"
            style={slideStyle(navVisible, 20)}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="flex-shrink-0">
                <Link
                  href={link.href}
                  data-cursor="hover"
                  className={cn(
                    "relative pb-1 font-jost text-[0.72rem] font-semibold tracking-[0.16em] uppercase whitespace-nowrap",
                    "transition-colors duration-[420ms] ease-[ease]",
                    isActive(link.href)
                      ? "text-[var(--gold)]"
                      : atTop
                        ? "text-white/90 hover:text-white"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-px w-full origin-left"
                    style={{
                      background: "var(--gold)",
                      transform: isActive(link.href)
                        ? "scaleX(1)"
                        : "scaleX(0)",
                      transition:
                        "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Spacer — mobile/tablet: pushes right cluster to far right */}
          <div className="lg:hidden flex-1" aria-hidden="true" />

          {/* ── Right utility cluster ──────────────────────────────────────── */}
          <div className="flex-shrink-0 flex items-center gap-3 sm:gap-4 xl:gap-5 z-10">
            {/* Social icons — desktop only, animated */}
            <div
              className={cn(
                "hidden lg:flex items-center gap-2",
                atTop && "nav-over-dark",
              )}
              style={slideStyle(navVisible, 40)}
              role="list"
              aria-label="Social media links"
            >
              {SOCIAL_LINKS.map(({ id, label, href }) => (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`VIXX Interiors on ${label}`}
                  data-cursor="hover"
                  className="social-icon"
                  role="listitem"
                >
                  <SocialIcon id={id} size={16} />
                </a>
              ))}
            </div>

            {/* Theme toggle — bordered circle, clearly recognisable, animated */}
            {mounted && (
              <div style={slideStyle(navVisible, 60)}>
                <button
                  onClick={toggleTheme}
                  aria-label={
                    isDark ? "Switch to light mode" : "Switch to dark mode"
                  }
                  data-cursor="hover"
                  className={cn(
                    "inline-flex items-center justify-center rounded-full",
                    "min-w-[44px] min-h-[44px]",
                    "transition-[color,border-color] duration-[420ms] ease-[ease]",
                    "active:scale-90 active:opacity-60",
                    atTop
                      ? "border border-white/30 text-white hover:border-white/60 hover:text-white"
                      : "border border-[var(--border-strong)] text-[var(--text-secondary)] hover:border-[var(--gold-border)] hover:text-[var(--gold)]",
                  )}
                >
                  {isDark ? (
                    <Sun size={17} strokeWidth={1.5} />
                  ) : (
                    <Moon size={17} strokeWidth={1.5} />
                  )}
                </button>
              </div>
            )}

            {/* Desktop CTA — only at 2xl+ to avoid collision with nav links */}
            <div
              className="hidden lg:inline-flex"
              style={slideStyle(navVisible, 40)}
            >
              <Link
                onClick={closeMenu}
                href="/start"
                data-cursor="hover"
                className="btn-primary py-2 px-5 text-[0.58rem]"
              >
                Start a Project
              </Link>
            </div>

            {/* Mobile hamburger — animated */}
            <div className="lg:hidden" style={slideStyle(navVisible, 60)}>
              <button
                ref={hamburgerRef}
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                data-cursor="hover"
                className={cn(
                  "flex items-center justify-center min-w-[44px] min-h-[44px] w-8 h-8",
                  "active:opacity-60 transition-[color] duration-[420ms] ease-[ease]",
                  atTop ? "text-white" : "text-[var(--text-primary)]",
                )}
              >
                <span
                  style={{
                    display: "inline-flex",
                    transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    transform: open
                      ? "rotate(90deg) scale(0.9)"
                      : "rotate(0deg) scale(1)",
                  }}
                >
                  {open ? (
                    <X size={19} strokeWidth={1.5} />
                  ) : (
                    <Menu size={19} strokeWidth={1.5} />
                  )}
                </span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen menu — always in DOM, shown/hidden by anime.js */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="fixed inset-0 z-40 flex-col lg:hidden"
        style={{
          display: "none",
          background: "var(--bg-nav-menu)",
          backdropFilter: "blur(8px) saturate(110%)",
          WebkitBackdropFilter: "blur(8px) saturate(110%)",
        }}
      >
        {/* Spacer matching fixed header */}
        <div style={{ height: "var(--nav-height)", flexShrink: 0 }} />

        <nav
          className="flex flex-col flex-1 container-site py-8 sm:py-12 overflow-y-auto"
          aria-label="Mobile navigation links"
        >
          {/* Nav links */}
          <ul role="list" className="flex flex-col">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href} data-menu-item>
                  <Link
                    onClick={closeMenu}
                    href={link.href}
                    className={cn(
                      "block py-4 sm:py-5 border-b border-[var(--border)]",
                      active
                        ? "text-[var(--gold)]"
                        : "text-[var(--text-secondary)]",
                    )}
                  >
                    <GlowText
                      active={active}
                      className="block font-cormorant text-3xl sm:text-4xl font-light"
                    >
                      {link.label}
                    </GlowText>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Social links */}
          <div
            data-menu-item
            className="mt-10 pt-6 border-t border-[var(--border)]"
            aria-label="Social media links"
          >
            <GlowText
              className="block font-jost text-[0.55rem] tracking-[0.32em] uppercase mb-5"
              style={{ color: "var(--gold-dim)" }}
            >
              Follow
            </GlowText>

            <ul role="list" className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ id, label, href }) => (
                <li key={id}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`VIXX Interiors on ${label}`}
                    data-cursor="hover"
                    className="social-icon !w-11 !h-11"
                  >
                    <SocialIcon id={id} size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div data-menu-item className="mt-8">
            <motion.div
              whileHover={{
                boxShadow:
                  "0 0 28px rgba(196,154,46,0.55), 0 0 60px rgba(196,154,46,0.25)",
                transition: SPRING,
              }}
              whileTap={{
                scale: 0.97,
                boxShadow:
                  "0 0 36px rgba(196,154,46,0.8), 0 0 72px rgba(196,154,46,0.4)",
                transition: SPRING,
              }}
              style={{ display: "inline-block", borderRadius: "9999px" }}
            >
              <Link href="/start" className="btn-primary">
                Start a Project
              </Link>
            </motion.div>
          </div>
        </nav>
      </div>
    </>
  );
}
